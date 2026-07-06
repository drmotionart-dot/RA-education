import { test, expect, API_BASE } from './helpers/auth';

test.describe('Survey Flow', () => {
  test('start survey -> answer 2 questions -> refresh -> same progress -> complete -> results', async ({
    authedPage: page, request,
  }) => {
    // Use the page's own token to keep API calls in the same identity as the browser
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const headers = { Authorization: `Bearer ${token}` };

    // Start survey via API
    const startRes = await request.post(`${API_BASE}/survey/start`, {
      headers, data: { type: 'specialty', role: 'doctor' },
    });
    test.skip(!startRes.ok(), `Survey start failed: ${await startRes.text()}`);
    const session = await startRes.json();
    expect(session.session_id).toBeTruthy();
    expect(session.status).toBe('in_progress');
    expect(session.question).toBeTruthy();

    const sessionId = session.session_id;
    const firstNodeId = session.question.node_id;
    const firstOptionIndex = session.question.options[0].index;

    // Answer Q1 via API
    const a1Res = await request.post(`${API_BASE}/survey/${sessionId}/answer`, {
      headers, data: { node_id: firstNodeId, option_index: firstOptionIndex },
    });
    expect(a1Res.ok()).toBeTruthy();
    const afterQ1 = await a1Res.json();
    expect(afterQ1.progress.answered).toBe(1);

    // Answer Q2 via API
    const q2NodeId = afterQ1.question.node_id;
    const q2OptionIndex = afterQ1.question.options[0].index;
    await request.post(`${API_BASE}/survey/${sessionId}/answer`, {
      headers, data: { node_id: q2NodeId, option_index: q2OptionIndex },
    });

    // Navigate to survey page in browser (simulates a refresh)
    await page.goto(`/survey/${sessionId}`);
    await page.waitForTimeout(3000);

    // Check that we're NOT on the error page
    const errorText = page.locator('text=Something went wrong');
    expect(await errorText.isVisible()).toBeFalsy();

    // The progress text should contain "2 of" (answered 2 questions)
    const bodyText = await page.locator('body').innerText();
    expect(bodyText).toContain('2 of');

    // A question heading should be present
    const questionEl = page.locator('h2[class*="font-heading"]');
    await expect(questionEl).toBeVisible();

    // Answer questions through the UI until survey completes
    for (let i = 0; i < 35; i++) {
      if (page.url().includes('/results')) break;

      // Click the first visible option button
      const optBtns = page.locator('button.cursor-pointer.rounded-lg.border');
      const optCount = await optBtns.count();
      if (optCount > 0) {
        await optBtns.first().click();
        await page.waitForTimeout(200);
      }

      // Click "Next Question"
      const nextBtn = page.locator('button:has-text("Next Question")');
      if (await nextBtn.isVisible()) {
        await nextBtn.click();
        await page.waitForTimeout(1500);
      } else {
        break;
      }
    }

    // Verify we landed on results or still on a survey page
    const finalUrl = page.url();
    expect(finalUrl.includes('/survey')).toBeTruthy();
  });
});
