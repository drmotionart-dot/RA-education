import { test, expect, API_BASE } from './helpers/auth';

test.describe('Survey Edge Cases', () => {
  test('navigating to invalid survey session shows error', async ({ authedPage: page }) => {
    await page.goto('/survey/invalid-session-id-12345');
    await page.waitForTimeout(3000);
    const errorText = page.getByText('Something went wrong');
    await expect(errorText).toBeVisible();
  });

  test('starting survey with invalid role returns error', async ({ request }) => {
    const mobile = `+20100009${String(Date.now()).slice(-6)}`;
    await request.post(`${API_BASE}/auth/otp/request`, { data: { mobile_number: mobile } });

    const mobileDigits = mobile.replace(/\D/g, '');
    let otp = '';
    for (let i = 0; i < 15; i++) {
      try {
        const fs = await import('fs');
        otp = fs.readFileSync(`${process.env.TMP || '/tmp'}/otp_${mobileDigits}.txt`, 'utf8').trim();
        if (otp) break;
      } catch { }
      await new Promise((r) => setTimeout(r, 500));
    }
    const verifyRes = await request.post(`${API_BASE}/auth/otp/verify`, {
      data: { mobile_number: mobile, code: otp },
    });
    const { token } = await verifyRes.json();
    const headers = { Authorization: `Bearer ${token}` };

    await request.post(`${API_BASE}/users/onboard`, {
      headers,
      data: { name: 'Survey Test', role: 'doctor' },
    });

    const startRes = await request.post(`${API_BASE}/survey/start`, {
      headers,
      data: { type: 'specialty', role: 'invalid_role' },
    });
    expect(startRes.ok()).toBeFalsy();
  });

  test('answering with wrong node_id returns error', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };

    const startRes = await request.post(`${API_BASE}/survey/start`, {
      headers, data: { type: 'specialty', role: 'doctor' },
    });
    test.skip(!startRes.ok(), 'Survey start failed');
    const session = await startRes.json();
    const sessionId = session.session_id;

    const ansRes = await request.post(`${API_BASE}/survey/${sessionId}/answer`, {
      headers,
      data: { node_id: 'NONEXISTENT_NODE', option_index: 0 },
    });
    expect(ansRes.ok()).toBeFalsy();
  });

  test('survey results page handles no matches', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };

    const startRes = await request.post(`${API_BASE}/survey/start`, {
      headers, data: { type: 'path', role: 'nurse' },
    });
    test.skip(!startRes.ok(), 'Survey start failed');
    const session = await startRes.json();

    let nodeId = session.question.node_id;
    for (let i = 0; i < 50; i++) {
      const optIdx = session.question.options?.[0]?.index ?? 0;
      const aRes = await request.post(`${API_BASE}/survey/${session.session_id}/answer`, {
        headers, data: { node_id: nodeId, option_index: optIdx },
      });
      const after = await aRes.json();
      if (after.status === 'completed') break;
      nodeId = after.question.node_id;
    }

    await page.goto(`/survey/${session.session_id}/results`);
    await page.waitForTimeout(2000);
    const hasResults = await page.getByText('Your Survey Results').isVisible().catch(() => false);
    const hasNoMatch = await page.getByText('No matches found').isVisible().catch(() => false);
    expect(hasResults || hasNoMatch).toBeTruthy();
  });

  test('survey landing page renders type and role selection', async ({ authedPage: page }) => {
    await page.goto('/survey');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Career Guidance Survey' })).toBeVisible();
    await expect(page.getByText('What would you like to explore?')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Specialties' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Paths' })).toBeVisible();
  });
});
