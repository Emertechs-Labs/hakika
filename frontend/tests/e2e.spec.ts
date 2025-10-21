import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Hakika/);
});

test('create post flow', async ({ page }) => {
  await page.goto('/create');
  await page.fill('input[name="title"]', 'Test Post');
  await page.fill('textarea[name="content"]', 'This is a test post content.');
  await page.selectOption('select[name="niche"]', 'sports');
  await page.click('button[type="submit"]');
  // Assuming success alert or redirect
  await expect(page).toHaveURL(/\/feed|\/$/);
});

test('voting on post', async ({ page }) => {
  await page.goto('/feed');
  const upvoteButton = page.locator('button[aria-label*="Upvote"]').first();
  await upvoteButton.click();
  // Check if vote count increases (would need backend running)
});

test('mobile responsiveness', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await expect(page.locator('.navbar')).toBeVisible();
});