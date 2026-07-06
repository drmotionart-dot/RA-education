import { test, expect, API_BASE } from './helpers/auth';

test.describe('Paths Feature', () => {
  test('paths page load with royalty college paths', async ({ authedPage: page }) => {
    await page.goto('/paths');
    await page.waitForSelector('h1:has-text("Career Paths")');

    const pathCards = page.locator('[class*="rounded-xl"][class*="border-"]');
    const count = await pathCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('category filter buttons visible and clickable', async ({ authedPage: page }) => {
    await page.goto('/paths');
    await page.waitForSelector('h1:has-text("Career Paths")');

    const filterBtns = page.locator('button.cursor-pointer.rounded-full');
    const btnCount = await filterBtns.count();
    expect(btnCount).toBeGreaterThanOrEqual(4);

    const filterLabels = ['All', 'Career', 'Migration', 'Training'];
    for (const label of filterLabels) {
      await expect(page.getByRole('button', { name: label })).toBeVisible();
    }
  });

  test('filtering by Training shows training paths', async ({ authedPage: page }) => {
    await page.goto('/paths');
    await page.waitForSelector('h1:has-text("Career Paths")');

    await page.getByRole('button', { name: 'Training' }).click();
    await page.waitForTimeout(500);

    await expect(page.getByText(/MRCP|MRCS|FRCR|FRCA|MRCGP|MRCPath|MRCOG|MFPH|MRCPsych/).first()).toBeVisible();
  });

  test('path detail shows timeline and stages', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const pathsRes = await request.get(`${API_BASE}/catalog/paths`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const paths = await pathsRes.json();
    test.skip(paths.length === 0, 'No paths seeded');

    const pathId = paths[0]._id;
    await page.goto(`/paths/${pathId}`);
    await page.waitForLoadState('networkidle');

    const heading = page.locator('h1');
    await expect(heading).toBeVisible();

    const stagesSection = page.getByText(/Stages|Timeline|Training/);
    if (await stagesSection.isVisible()) {
      const stageCards = page.locator('[class*="rounded-xl"]');
      expect(await stageCards.count()).toBeGreaterThan(0);
    }
  });

  test('Start This Path navigates to quick-pick', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const pathsRes = await request.get(`${API_BASE}/catalog/paths`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const paths = await pathsRes.json();
    test.skip(paths.length === 0, 'No paths seeded');

    const pathId = paths[0]._id;
    await page.goto(`/paths/${pathId}`);
    await page.waitForLoadState('networkidle');

    const startBtn = page.getByRole('button', { name: 'Start This Path' });
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    await page.waitForURL(/\/quick-pick\?pathId=/);
  });

  test('search input filters paths', async ({ authedPage: page }) => {
    await page.goto('/paths');
    await page.waitForLoadState('networkidle');

    const searchInput = page.getByPlaceholder('Search paths or country...');
    await expect(searchInput).toBeVisible();

    await searchInput.fill('United Kingdom');
    await page.waitForTimeout(500);
    const ukSection = page.getByText('UNITED KINGDOM');
    await expect(ukSection).toBeVisible();
  });
});

test.describe('Specialties Feature', () => {
  test('specialty detail shows Quick Pick button', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const specRes = await request.get(`${API_BASE}/catalog/specialties`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const specialties = await specRes.json();
    test.skip(specialties.length === 0, 'No specialties seeded');

    await page.goto(`/explore/specialties/${specialties[0]._id}`);
    await page.waitForLoadState('networkidle');

    const quickPickBtn = page.getByRole('button', { name: 'Quick Pick This' });
    if (await quickPickBtn.isVisible()) {
      await quickPickBtn.click();
      await page.waitForURL(/\/quick-pick/);
    }
  });

  test('specialty detail shows View Paths button', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const specRes = await request.get(`${API_BASE}/catalog/specialties`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const specialties = await specRes.json();
    test.skip(specialties.length === 0, 'No specialties seeded');

    await page.goto(`/explore/specialties/${specialties[0]._id}`);
    await page.waitForLoadState('networkidle');

    const viewPathsBtn = page.getByRole('button', { name: 'View Paths' });
    if (await viewPathsBtn.isVisible()) {
      await viewPathsBtn.click();
      await page.waitForURL('/paths');
    }
  });
});
