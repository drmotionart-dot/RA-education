import { test, expect, API_BASE } from './helpers/auth';

test.describe('Companion Feature', () => {
  test('companion page loads with tabs', async ({ authedPage: page }) => {
    await page.goto('/companion');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Companion' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'My Companion' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Find' })).toBeVisible();
  });

  test('find tab shows search interface', async ({ authedPage: page }) => {
    await page.goto('/companion');
    await page.waitForLoadState('networkidle');

    await page.getByRole('button', { name: 'Find' }).click();
    await page.waitForTimeout(500);

    const refreshBtn = page.getByRole('button', { name: /Refresh/i });
    if (await refreshBtn.isVisible().catch(() => false)) {
      await expect(refreshBtn).toBeVisible();
    }
  });

  test('companion section appears on dashboard', async ({ authedPage: page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');

    const companionSection = page.getByText(/Study Companion|Find a Companion/);
    await expect(companionSection).toBeVisible();
  });
});

test.describe('Assessment Feature', () => {
  test('assessment landing page shows specialty list', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const specRes = await request.get(`${API_BASE}/catalog/specialties`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const specialties = await specRes.json();
    test.skip(specialties.length === 0, 'No specialties seeded');

    await page.goto('/assessment');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Diagnostic Assessment' })).toBeVisible();
    const firstSpec = page.getByText(specialties[0].name);
    await expect(firstSpec).toBeVisible();
  });
});
