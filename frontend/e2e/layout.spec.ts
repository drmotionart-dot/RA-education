import { test, expect, API_BASE } from './helpers/auth';

test.describe('Layout & Navigation', () => {
  test('navbar renders all nav links', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    await expect(page.getByTitle('Dashboard')).toBeVisible();
    await expect(page.getByTitle('Explore')).toBeVisible();
    await expect(page.getByTitle('Paths')).toBeVisible();
    await expect(page.getByTitle('Quick Pick')).toBeVisible();
    await expect(page.getByTitle('Assessment')).toBeVisible();
    await expect(page.getByTitle('Survey')).toBeVisible();
    await expect(page.getByTitle('Profile')).toBeVisible();
    await expect(page.getByTitle('Logout')).toBeVisible();
  });

  test('nav links navigate correctly', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const navLinks = [
      { title: 'Explore', url: '/explore' },
      { title: 'Paths', url: '/paths' },
      { title: 'Quick Pick', url: '/quick-pick' },
      { title: 'Profile', url: '/profile' },
    ];

    for (const link of navLinks) {
      await page.getByTitle(link.title).click();
      await page.waitForURL(`**${link.url}`, { timeout: 10000 });
      const currentUrl = page.url();
      expect(currentUrl).toContain(link.url);
    }
  });

  test('active nav link has highlighted style', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForLoadState('networkidle');

    const activeLink = page.getByTitle('Explore');
    const bgClass = await activeLink.getAttribute('class');
    expect(bgClass).toContain('bg-[var(--color-primary)]');
  });

  test('brand link navigates to dashboard', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.getByRole('link', { name: /RA Edu/i }).click();
    await page.waitForURL('/dashboard');
  });

  test('logout clears token', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    await page.getByTitle('Logout').click();
    await page.waitForTimeout(2000);

    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeNull();
  });

  test('dashboard quick actions navigate correctly', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const quickActions = [
      { label: 'Explore', url: '/explore' },
      { label: 'Quick Pick', url: '/quick-pick' },
      { label: 'Survey', url: '/survey' },
      { label: 'Assessment', url: '/assessment' },
      { label: 'Paths', url: '/paths' },
    ];

    for (const action of quickActions) {
      await page.goto('/dashboard');
      await page.waitForSelector('text=Quick Actions');
      await page.getByText(action.label).first().click();
      await page.waitForURL(`**${action.url}`, { timeout: 10000 });
      expect(page.url()).toContain(action.url);
    }
  });
});

test.describe('Protected Routes', () => {
  test('unauthenticated access to protected routes redirects to /login', async ({ page }) => {
    const routes = ['/dashboard', '/explore', '/paths', '/profile', '/plan', '/survey', '/assessment', '/companion'];
    for (const route of routes) {
      await page.goto(route);
      await page.waitForURL(/\/login/, { timeout: 5000 });
      expect(page.url()).toContain('/login');
    }
  });
});

test.describe('Theme Persistence', () => {
  test('theme toggle persists across page navigation', async ({ authedPage: page }) => {
    await page.goto('/explore');
    const toggle = page.getByTitle('Toggle theme').first();

    const initialDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    await toggle.click();
    await page.waitForTimeout(400);

    await page.goto('/paths');
    await page.waitForLoadState('networkidle');
    const afterDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(afterDark).toBe(!initialDark);
  });
});
