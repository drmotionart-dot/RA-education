import { test, expect, API_BASE } from './helpers/auth';

test.describe('Lessons Feature', () => {
  test('lessons plan page renders plan info', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };

    const planRes = await request.get(`${API_BASE}/plan/current`, { headers });
    test.skip(!planRes.ok(), 'No active plan');

    await page.goto('/plan');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'My Study Plan' })).toBeVisible();

    const lessonSection = page.getByText('Lessons');
    await expect(lessonSection).toBeVisible();
  });

  test('plan page shows lesson cards', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };

    const planRes = await request.get(`${API_BASE}/plan/current`, { headers });
    test.skip(!planRes.ok(), 'No active plan');

    await page.goto('/plan');
    await page.waitForLoadState('networkidle');

    const lessonCards = page.locator('[class*="rounded-xl"][class*="border-"]');
    const count = await lessonCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('no plan page shows create and browse options', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };

    const planRes = await request.get(`${API_BASE}/plan/current`, { headers });
    if (planRes.ok()) {
      test.skip(true, 'User has active plan — skipping no-plan test');
    }

    await page.goto('/plan');
    await page.waitForLoadState('networkidle');

    await expect(page.getByText('No Active Plan')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create One' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Browse Specialties' })).toBeVisible();
  });

  test('plan history page renders', async ({ authedPage: page }) => {
    await page.goto('/plan/history');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Plan History' })).toBeVisible();
  });

  test('lesson detail page shows resources', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };

    const planRes = await request.get(`${API_BASE}/plan/current`, { headers });
    test.skip(!planRes.ok(), 'No active plan');
    const plan = await planRes.json();

    const lessons = plan.lessons || [];
    test.skip(lessons.length === 0, 'Plan has no lessons');

    const accessibleLesson = lessons.find(l => l.status === 'in_progress' || l.status === 'available');
    test.skip(!accessibleLesson, 'No accessible lessons');

    await page.goto(`/plan/lessons/${accessibleLesson._id}`);
    await page.waitForLoadState('networkidle');

    const lessonTitle = page.locator('h1');
    await expect(lessonTitle).toBeVisible();
  });
});
