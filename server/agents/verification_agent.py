import sys
import time
import requests
from uagents import Agent, Bureau


class VerificationAgent(Agent):
    def __init__(self, name: str, backend_url: str):
        super().__init__(name)
        self.backend_url = backend_url.rstrip('/')
        self.last_checked = None

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
                        self.reverify_post(post['_id'])
                if posts:
                    self.last_checked = posts[0]['createdAt']  # Update to latest
        except Exception as e:
            self.logger.error(f"Error checking posts: {e}")

    def reverify_post(self, post_id):
        try:
            resp = requests.post(f"{self.backend_url}/api/posts/{post_id}/reverify", timeout=60)
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
