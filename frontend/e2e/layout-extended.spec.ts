import { test, expect } from './helpers/auth';

test.describe('Layout Extended', () => {
  test('footer renders on landing page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/RA Education/).first()).toBeVisible();
    await expect(footer.getByText(/All rights reserved/)).toBeVisible();
    await expect(footer.getByTitle('Toggle theme')).toBeVisible();
  });

  test('sidebar nav items are visible', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByTitle('Dashboard')).toBeVisible();
    await expect(page.getByTitle('Explore')).toBeVisible();
    await expect(page.getByTitle('Paths')).toBeVisible();
  });

  test('nav links have correct text', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByTitle('Dashboard')).toBeVisible();
    await expect(page.getByTitle('Explore')).toBeVisible();
    await expect(page.getByTitle('Paths')).toBeVisible();
    await expect(page.getByTitle('Quick Pick')).toBeVisible();
    await expect(page.getByTitle('Assessment')).toBeVisible();
    await expect(page.getByTitle('Survey')).toBeVisible();
  });

  test('brand link has correct href', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForLoadState('networkidle');
    const brand = page.getByRole('link', { name: /RA Edu/i });
    await expect(brand).toBeVisible();
    await expect(brand).toHaveAttribute('href', '/dashboard');
  });

  test('theme toggle icon changes on click', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const toggle = page.getByTitle('Toggle theme').first();
    await expect(toggle).toBeVisible();
    const initialHtml = await toggle.innerHTML();
    await toggle.click();
    await page.waitForTimeout(400);
    const afterHtml = await toggle.innerHTML();
    expect(afterHtml).not.toBe(initialHtml);
  });

  test('sidebar renders at mobile viewport width', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: /Open menu/i }).click();
    await page.waitForTimeout(400);
    await expect(page.getByTitle('Dashboard')).toBeVisible();
    await expect(page.getByTitle('Profile')).toBeVisible();
  });

  test('sidebar renders at tablet viewport width', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByTitle('Explore')).toBeVisible();
    await expect(page.getByTitle('Paths')).toBeVisible();
    await expect(page.getByTitle('Quick Pick')).toBeVisible();
  });

  test('profile icon visible in sidebar', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const profileLink = page.getByTitle('Profile');
    await expect(profileLink).toBeVisible();
    await profileLink.click();
    await page.waitForURL('/profile');
    await expect(page.locator('h1')).toContainText('Profile');
  });

  test('nav items remain visible after navigating multiple pages', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const pages = ['/explore', '/paths', '/quick-pick', '/plan', '/profile'];
    for (const p of pages) {
      await page.goto(p);
      await page.waitForLoadState('networkidle');
      await expect(page.getByTitle('Dashboard')).toBeVisible();
      await expect(page.getByTitle('Explore')).toBeVisible();
      await expect(page.getByTitle('Profile')).toBeVisible();
    }
  });
});
