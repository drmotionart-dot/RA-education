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

  test('navbar is sticky at top', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    const position = await nav.evaluate((el) => getComputedStyle(el).position);
    expect(position).toBe('sticky');
  });

  test('nav links have correct href attributes', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const checks = [
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Explore', href: '/explore' },
      { title: 'Paths', href: '/paths' },
      { title: 'Quick Pick', href: '/quick-pick' },
      { title: 'Assessment', href: '/assessment' },
      { title: 'Survey', href: '/survey' },
    ];
    for (const { title, href } of checks) {
      const link = page.getByTitle(title);
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute('href', href);
    }
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

  test('navbar renders at mobile viewport width', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    await expect(page.getByTitle('Dashboard')).toBeVisible();
    await expect(page.getByTitle('Profile')).toBeVisible();
  });

  test('navbar renders at tablet viewport width', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByTitle('Explore')).toBeVisible();
    await expect(page.getByTitle('Paths')).toBeVisible();
    await expect(page.getByTitle('Quick Pick')).toBeVisible();
  });

  test('profile icon visible in navbar', async ({ authedPage: page }) => {
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
