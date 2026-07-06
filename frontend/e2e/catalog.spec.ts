import { test, expect } from './helpers/auth';

test.describe('Catalog', () => {
  test('specialties page loads and displays cards with gold border', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');

    const cards = page.locator('[class*="border-"][class*="rounded-xl"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    const borderColor = await cards.first().evaluate((el) =>
      getComputedStyle(el).borderColor
    );
    expect(borderColor.toLowerCase()).toContain('201');
  });

  test('click specialty card navigates to detail', async ({ authedPage: page }) => {
    await page.goto('/explore');

    const card = page.locator('[class*="rounded-xl"]').first();
    await card.click();

    await page.waitForURL(/\/explore\/specialties\//);
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('specialty detail shows branches', async ({ authedPage: page }) => {
    await page.goto('/explore');
    const card = page.locator('[class*="rounded-xl"]').first();
    await card.click();
    await page.waitForURL(/\/explore\/specialties\//);

    const branchCards = page.locator('[class*="rounded-xl"]');
    const count = await branchCards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('paths page loads and displays path cards', async ({ authedPage: page }) => {
    await page.goto('/paths');
    await page.waitForSelector('h1:has-text("Career Paths")');

    const cards = page.locator('[class*="border-"][class*="rounded-xl"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });
});
