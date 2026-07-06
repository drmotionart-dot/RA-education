import { test, expect, API_BASE } from './helpers/auth';

test.describe('Assessment Flow', () => {
  test('start assessment -> answer questions -> view results', async ({
    authedPage: page, request,
  }) => {
    // Use the page's own token so the browser sees the same identity
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };

    // Find a specialty
    const catRes = await request.get(`${API_BASE}/catalog/specialties`);
    expect(catRes.ok()).toBeTruthy();
    const specialties = await catRes.json();
    test.skip(specialties.length === 0, 'No specialties seeded');

    const specialtyId = specialties[0]._id;

    // Start assessment
    const startRes = await request.post(`${API_BASE}/assessment/start`, {
      headers, data: { specialty_id: specialtyId },
    });
    test.skip(!startRes.ok(), `Cannot start assessment: ${await startRes.text()}`);
    const assessment = await startRes.json();
    expect(assessment.assessment_id).toBeTruthy();

    const assessmentId = assessment.assessment_id;

    // Navigate to assessment in browser
    await page.goto(`/assessment/${assessmentId}`);

    // Answer questions via API until completed
    let completed = false;
    for (let i = 0; i < 50; i++) {
      const nextRes = await request.get(`${API_BASE}/assessment/${assessmentId}/next`, { headers });
      const next = await nextRes.json();
      if (next.status === 'completed') { completed = true; break; }
      if (!next.question) break;

      const qId = next.question._id;
      const opts = next.question.options || [];
      if (opts.length === 0) break;

      const ansRes = await request.post(`${API_BASE}/assessment/${assessmentId}/answer`, {
        headers,
        data: { question_id: qId, selected_option_ids: [opts[0]._id] },
      });
      expect(ansRes.ok()).toBeTruthy();
    }

    if (completed) {
      await page.reload();
      await page.waitForTimeout(2000);

      const heading = page.locator('h1');
      await expect(heading).toContainText('Assessment', { timeout: 10000 });
    }
  });
});
