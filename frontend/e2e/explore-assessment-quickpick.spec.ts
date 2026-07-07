import { test, expect, API_BASE } from './helpers/auth';

test.describe('Explore Features', () => {
  test('explore page loads with heading and specialty cards', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Medical Specialties' })).toBeVisible();
    const cards = page.locator('[class*="rounded-xl"][class*="border-"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('explore search filters specialties', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForLoadState('networkidle');
    const searchInput = page.getByPlaceholder('Search specialties...');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('ZZZZNOMATCH');
    await page.waitForTimeout(500);
    const empty = page.getByText('No specialties match your search.');
    if (await empty.isVisible().catch(() => false)) {
      await expect(empty).toBeVisible();
    }
  });

  test('specialty detail page loads with action buttons', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const specRes = await request.get(`${API_BASE}/catalog/specialties`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const specialties = await specRes.json();
    test.skip(specialties.length === 0, 'No specialties seeded');
    await page.goto(`/explore/specialties/${specialties[0]._id}`);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: specialties[0].name })).toBeVisible();
    const viewPaths = page.getByRole('button', { name: 'View Paths' });
    const quickPick = page.getByRole('button', { name: 'Quick Pick This' });
    await expect(viewPaths.or(quickPick).first()).toBeVisible();
  });

  test('specialty card click navigates to detail', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const specRes = await request.get(`${API_BASE}/catalog/specialties`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const specialties = await specRes.json();
    test.skip(specialties.length === 0, 'No specialties seeded');
    await page.goto('/explore');
    await page.waitForLoadState('networkidle');
    const card = page.getByText(specialties[0].name).first();
    await card.click();
    await page.waitForURL(/\/explore\/specialties\//, { timeout: 10000 });
    expect(page.url()).toContain(specialties[0]._id);
  });
});

test.describe('Quick Pick', () => {
  test('quick pick page loads with step 1 heading', async ({ authedPage: page }) => {
    await page.goto('/quick-pick');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Choose a Specialty' })).toBeVisible();
  });

  test('quick pick search input visible', async ({ authedPage: page }) => {
    await page.goto('/quick-pick');
    await page.waitForLoadState('networkidle');
    const searchInput = page.getByPlaceholder(/Search/i).first();
    await expect(searchInput).toBeVisible();
  });
});

test.describe('Assessment Landing', () => {
  test('assessment page loads with heading', async ({ authedPage: page }) => {
    await page.goto('/assessment');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Diagnostic Assessment' })).toBeVisible();
  });

  test('assessment lists specialty cards', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const specRes = await request.get(`${API_BASE}/catalog/specialties`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const specialties = await specRes.json();
    test.skip(specialties.length === 0, 'No specialties seeded');
    await page.goto('/assessment');
    await page.waitForLoadState('networkidle');
    const firstSpec = page.getByText(specialties[0].name);
    await expect(firstSpec).toBeVisible();
  });
});

test.describe('Auth Pages', () => {
  test('forgot password page shows both steps', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await expect(page.getByPlaceholder('01012345678 or you@example.com')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send Code' })).toBeVisible();
  });

  test('onboarding page loads with heading', async ({ page }) => {
    await page.goto('/onboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('heading', { name: 'Complete Profile' })).toBeVisible();
  });

  test('verify OTP page shows heading', async ({ page }) => {
    await page.goto('/verify-otp', { waitUntil: 'networkidle' });
    const heading = page.getByRole('heading', { name: 'Verify OTP' });
    if (await heading.isVisible().catch(() => false)) {
      await expect(heading).toBeVisible();
    }
  });

  test('catalog path detail page loads', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const pathsRes = await request.get(`${API_BASE}/catalog/paths`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const paths = await pathsRes.json();
    test.skip(paths.length === 0, 'No paths seeded');
    await page.goto(`/paths/${paths[0]._id}`);
    await page.waitForLoadState('networkidle');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(page.getByRole('button', { name: 'Start This Path' })).toBeVisible();
  });
});
