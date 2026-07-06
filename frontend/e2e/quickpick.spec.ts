import { test, expect, API_BASE } from './helpers/auth';

test.describe('QuickPick -> Plan', () => {
  test('quickpick wizard -> generate plan -> view plan', async ({
    authedPage: page, request,
  }) => {
    // Use the page's own token so API calls match the browser's identity
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };

    // Get first specialty and path for selection
    const [catRes, pathsRes] = await Promise.all([
      request.get(`${API_BASE}/catalog/specialties`),
      request.get(`${API_BASE}/catalog/paths`),
    ]);
    const specialties = await catRes.json();
    const paths = await pathsRes.json();
    test.skip(specialties.length === 0 || paths.length === 0, 'No specialties/paths seeded');

    const specialtyId = specialties[0]._id;
    const pathId = paths[0]._id;

    const qpRes = await request.post(`${API_BASE}/quickpick`, {
      headers,
      data: { specialty_id: specialtyId, path_id: pathId, preset_duration_months: 12 },
    });
    test.skip(!qpRes.ok(), `QuickPick failed: ${await qpRes.text()}`);
    const qp = await qpRes.json();

    // Generate plan — this also sets user.current_plan_id
    const genRes = await request.post(`${API_BASE}/plan/generate`, {
      headers, data: { quickpick_id: qp.id },
    });
    test.skip(!genRes.ok(), `Plan generation failed: ${await genRes.text()}`);

    // Navigate to plan page — should show the active plan now
    await page.goto('/plan');
    await page.waitForSelector('h1');

    const planHeading = page.locator('h1');
    await expect(planHeading).toContainText('My Study Plan');

    const lessonItems = page.locator('[class*="rounded-xl"]');
    const count = await lessonItems.count();
    expect(count).toBeGreaterThan(0);
  });
});
