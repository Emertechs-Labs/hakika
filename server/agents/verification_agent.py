import sys
import time
import requests
import os
from uagents import Agent, Bureau


class VerificationAgent(Agent):
    def __init__(self, name: str, backend_url: str):
        super().__init__(name)
        self.backend_url = backend_url.rstrip('/')
        self.last_checked = None
        self.asi_api_key = os.getenv('ASI_ONE_API_KEY')

    async def run(self):
        while True:
            self.check_new_posts()
            time.sleep(60)  # Poll every 60 seconds

    def check_new_posts(self):
        try:
            # Fetch posts created since last check
            params = {'since': self.last_checked} if self.last_checked else {}
            resp = requests.get(f"{self.backend_url}/api/posts", params=params, timeout=30)
            if resp.status_code == 200:
                posts = resp.json()
                for post in posts:
                    if not post.get('verified') or post.get('verificationScore', 0) < 50:
                        self.reverify_post(post['_id'], post.get('content', ''))
                if posts:
                    self.last_checked = posts[0]['createdAt']  # Update to latest
        except Exception as e:
            self.logger.error(f"Error checking posts: {e}")

    def reverify_post(self, post_id, content):
        try:
            # Use ASI:One for inference
            verification_score = self.verify_with_asi(content)
            resp = requests.put(f"{self.backend_url}/api/posts/{post_id}", json={
                'verified': verification_score > 80,
                'verificationScore': verification_score
            }, timeout=60)
            if resp.status_code == 200:
                post = resp.json()
                if post.get('verified') and post.get('verificationScore', 0) > 80:
                    # Auto-mint reward
                    requests.post(f"{self.backend_url}/api/rewards", json={
                        'walletAddress': post.get('author'),  # Assuming author has wallet
                        'score': post['verificationScore']
                    }, timeout=30)
                self.logger.info(f"Post {post_id} updated and rewarded if eligible")
            elif resp.status_code == 404:
                self.logger.error(f"Post {post_id} not found")
            else:
                self.logger.error(f"Failed to update post {post_id}: {resp.text}")
        except Exception as e:
            self.logger.error(f"Error reverifying post {post_id}: {e}")

    def verify_with_asi(self, content):
        if not self.asi_api_key:
            self.logger.warning("ASI_ONE_API_KEY not set, using mock score")
            return 85  # Mock score
        try:
            url = "https://api.asi1.ai/v1/chat/completions"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.asi_api_key}"
            }
            data = {
                "model": "asi1-mini",
                "messages": [
                    {"role": "system", "content": "You are a fact-checking AI. Rate the accuracy of the following content on a scale of 0-100, where 100 is completely accurate."},
                    {"role": "user", "content": content}
                ]
            }
            resp = requests.post(url, headers=headers, json=data, timeout=30)
            if resp.status_code == 200:
                result = resp.json()
                # Parse the response for score
                message = result['choices'][0]['message']['content']
                # Extract number from response
                import re
                match = re.search(r'\b(\d{1,3})\b', message)
                if match:
                    score = int(match.group(1))
                    return min(max(score, 0), 100)
                else:
                    return 50  # Default
            else:
                self.logger.error(f"ASI API error: {resp.status_code} {resp.text}")
                return 50
        except Exception as e:
            self.logger.error(f"Error calling ASI: {e}")
            return 50


def main():
    if len(sys.argv) < 2:
        print("Usage: verification_agent.py <backend_url>")
        sys.exit(1)

    backend_url = sys.argv[1]

    agent = VerificationAgent("HakikaVerifier", backend_url)
    bureau = Bureau()
    bureau.add(agent)
    bureau.run()


if __name__ == "__main__":
    main()
