import { test, expect } from './helpers/auth';

test.describe('Theme Modes', () => {
  test('light mode CSS variables applied on :root', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    const bg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim());
    expect(bg).toBe('#FAF8F5');
    const primary = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim());
    expect(primary).toBe('#0A1428');
  });

  test('dark mode CSS variables applied via .dark class', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    const bg = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim());
    expect(bg).toBe('#14181F');
    const primary = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim());
    expect(primary).toBe('#D4D4D4');
  });

  test('theme toggle switches from light to dark', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); });
    const toggle = page.getByTitle('Toggle theme').first();
    await toggle.click();
    await page.waitForTimeout(400);
    const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);
  });

  test('theme toggle switches from dark to light', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => { document.documentElement.classList.remove('dark'); localStorage.setItem('theme', 'light'); });
    const toggle = page.getByTitle('Toggle theme').first();
    await toggle.click();
    await page.waitForTimeout(400);
    let isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);
    await toggle.click();
    await page.waitForTimeout(400);
    isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(false);
  });

  test('theme persists across multiple page navigations', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.documentElement.classList.remove('dark'));

    await page.getByTitle('Toggle theme').first().click();
    await page.waitForTimeout(400);
    let isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);

    await page.goto('/explore');
    await page.waitForLoadState('networkidle');
    isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);

    await page.goto('/paths');
    await page.waitForLoadState('networkidle');
    isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);

    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(isDark).toBe(true);
  });

  test('localStorage theme key updated on toggle', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => localStorage.setItem('theme', 'light'));

    await page.getByTitle('Toggle theme').first().click();
    await page.waitForTimeout(400);
    const storedDark = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedDark).toBe('dark');

    await page.getByTitle('Toggle theme').first().click();
    await page.waitForTimeout(400);
    const storedLight = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedLight).toBe('light');
  });

  test('dashboard stat cards visible in dark mode', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.documentElement.classList.add('dark'));

    await expect(page.getByText('Lessons Done')).toBeVisible();
    await expect(page.getByText('Plan Progress')).toBeVisible();
    await expect(page.getByText('Days Active')).toBeVisible();
    await expect(page.getByText('This Month')).toBeVisible();
  });

  test('explore page renders in dark mode', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.documentElement.classList.add('dark'));

    await expect(page.getByRole('heading', { name: 'Medical Specialties' })).toBeVisible();
    const cards = page.locator('[class*="rounded-xl"][class*="border-"]');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('profile page renders in both themes', async ({ authedPage: page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');

    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
    const saveBtn = page.getByRole('button', { name: 'Save' });
    await expect(saveBtn).toBeVisible();

    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await expect(page.getByRole('heading', { name: 'Profile' })).toBeVisible();
    await expect(saveBtn).toBeVisible();
  });

  test('theme toggle on landing page persists after navigation', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const toggle = page.getByTitle('Toggle theme').first();
    await toggle.click();
    await page.waitForTimeout(400);
    const darkBefore = await page.evaluate(() => document.documentElement.classList.contains('dark'));

    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    const darkAfter = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(darkAfter).toBe(darkBefore);
  });

  test('body has transition for smooth theme switch', async ({ page }) => {
    await page.goto('/login');
    const transition = await page.evaluate(() => getComputedStyle(document.body).transition);
    expect(transition).toContain('background-color');
    expect(transition).toContain('color');
  });

  test('toggling dark class changes body background color', async ({ page }) => {
    await page.goto('/login');
    await page.evaluate(() => document.documentElement.classList.remove('dark'));
    const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForTimeout(300);
    const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(darkBg).not.toBe(lightBg);
  });
});
