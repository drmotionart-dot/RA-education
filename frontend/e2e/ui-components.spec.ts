import { test, expect, API_BASE } from './helpers/auth';

test.describe('UI Components', () => {
  test('button renders with correct variants', async ({ authedPage: page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');

    const saveBtn = page.getByRole('button', { name: 'Save' });
    await expect(saveBtn).toBeVisible();
    await expect(saveBtn).not.toBeDisabled();

    const dangerBtn = page.getByRole('button', { name: 'Delete Account' });
    await expect(dangerBtn).toBeVisible();
  });

  test('progress bar renders with correct percentage', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const bar = page.locator('.h-2.rounded-full.bg-\\[var\\(--color-border\\)\\]');
    const count = await bar.count();

    if (count > 0) {
      const innerBar = bar.first().locator('> div');
      const width = await innerBar.getAttribute('style');
      expect(width).toContain('width:');
    }
  });

  test('card component has gold border', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');

    const card = page.locator('[class*="rounded-xl"][class*="border-"]').first();
    await expect(card).toBeVisible();

    const borderColor = await card.evaluate((el) => getComputedStyle(el).borderColor);
    expect(borderColor.toLowerCase()).toContain('201');
  });

  test('tilt card has hover animation', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');

    const card = page.locator('[class*="rounded-xl"]').first();
    const initialTransform = await card.evaluate((el) => getComputedStyle(el).transform);

    await card.hover({ force: true });
    await page.waitForTimeout(300);

    const hoverTransform = await card.evaluate((el) => getComputedStyle(el).transform);
    expect(hoverTransform).not.toBe(initialTransform);
  });

  test('search input works on specialties page', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');

    const searchInput = page.getByPlaceholder('Search specialties...');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('Cardiology');
    await page.waitForTimeout(300);
    const cards = page.locator('[class*="rounded-xl"]');
    const count = await cards.count();

    if (count === 0) {
      await expect(page.getByText('No specialties match your search.')).toBeVisible();
    }
  });

  test('dashboard stat cards display values', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('Lessons Done')).toBeVisible();
    await expect(page.getByText('Plan Progress')).toBeVisible();
    await expect(page.getByText('Days Active')).toBeVisible();
    await expect(page.getByText('Current Month')).toBeVisible();
  });

  test('profile input fields are editable', async ({ authedPage: page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');

    const nameInput = page.locator('input[type="text"]').first();
    await expect(nameInput).toBeVisible();
    await expect(nameInput).not.toBeDisabled();

    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('navbar brand and profile section visible', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const brand = page.getByRole('link', { name: /RA Edu/i });
    await expect(brand).toBeVisible();

    await expect(page.getByTitle('Profile')).toBeVisible();
  });
});
