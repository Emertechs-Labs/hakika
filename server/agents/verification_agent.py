import sys
import requests
from uagents import Agent, Bureau


class VerificationAgent(Agent):
    def __init__(self, name: str, backend_url: str, post_id: str):
        super().__init__(name)
        self.backend_url = backend_url.rstrip('/')
        self.post_id = post_id

    async def run(self):
        post = self._fetch_post()
        if not post:
            self.logger.error(f"Post {self.post_id} not found")
            return

        resp = requests.post(f"{self.backend_url}/api/posts/{self.post_id}/reverify", timeout=60)
        if resp.status_code == 404:
            self.logger.error(f"Post {self.post_id} not found when updating")
        elif resp.status_code >= 400:
            self.logger.error(f"Failed to update post {self.post_id}: {resp.text}")
        else:
            self.logger.info(f"Post {self.post_id} updated via uAgent")

    def _fetch_post(self):
        resp = requests.get(f"{self.backend_url}/api/posts/{self.post_id}", timeout=30)
        if resp.status_code == 200:
            return resp.json()
        return None


def main():
    if len(sys.argv) < 3:
        print("Usage: verification_agent.py <post_id> <backend_url>")
        sys.exit(1)

    post_id = sys.argv[1]
    backend_url = sys.argv[2]

    agent = VerificationAgent("HakikaVerifier", backend_url, post_id)
    bureau = Bureau()
    bureau.add(agent)
    bureau.run()


if __name__ == "__main__":
    main()
