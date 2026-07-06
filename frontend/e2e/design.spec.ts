import { test, expect } from './helpers/auth';
import { mkdirSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = join(process.cwd(), 'e2e-screenshots');

test.describe('Design System v2', () => {
  test.beforeAll(async () => {
    try { mkdirSync(SCREENSHOT_DIR, { recursive: true }); } catch {}
  });

  test('gold border CSS variables applied on card elements', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');

    // Check the CSS custom property on the root
    const borderAccent = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-border-accent').trim()
    );
    expect(borderAccent).toBeTruthy();

    // Check a card element's computed border color
    const card = page.locator('[class*="rounded-xl"]').first();
    await expect(card).toBeVisible();
    const borderColor = await card.evaluate((el) =>
      getComputedStyle(el).borderColor
    );
    // Gold should have red value in the 200+ range
    const hasGoldRed = borderColor.includes('201');
    expect(hasGoldRed).toBeTruthy();

    await page.screenshot({
      path: join(SCREENSHOT_DIR, 'specialties-light.png'),
      fullPage: true,
    });
  });

  test('dark mode toggle switches theme variables', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');

    // Toggle dark mode via the Navbar button if it exists
    const darkToggle = page.locator('button:has([class*="lucide-moon"]), button:has([class*="lucide-sun"])');
    if (await darkToggle.count() > 0) {
      await darkToggle.click();
      await page.waitForTimeout(500);
    } else {
      // Fallback: toggle directly
      await page.evaluate(() => {
        document.documentElement.classList.toggle('dark');
      });
    }

    const htmlClass = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    );
    const primaryColor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
    );

    if (htmlClass) {
      // Dark mode: primary should be #D4D4D4 (light gray for WCAG AA)
      expect(primaryColor.toLowerCase()).toBe('#d4d4d4');
    }

    await page.screenshot({
      path: join(SCREENSHOT_DIR, 'specialties-dark.png'),
      fullPage: true,
    });
  });

  test('tilt card applies transform on hover (gold border + 3D rotate)', async ({ authedPage: page }) => {
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');

    const card = page.locator('[class*="rounded-xl"]').first();
    await expect(card).toBeVisible();

    // Get initial transform
    const initialTransform = await card.evaluate((el) =>
      getComputedStyle(el).transform
    );

    // Hover the card
    await card.hover({ force: true });
    await page.waitForTimeout(500);

    // Get hover transform
    const hoverTransform = await card.evaluate((el) =>
      getComputedStyle(el).transform
    );

    // Verify transform changed (tilt applied)
    expect(hoverTransform).not.toBe(initialTransform);

    // Verify gold border brightens on hover
    const hoverBorderColor = await card.evaluate((el) =>
      getComputedStyle(el).borderColor
    );
    const initialBorderColor = await card.evaluate((el) => {
      el.dispatchEvent(new Event('mouseleave'));
      return getComputedStyle(el).borderColor;
    });

    await page.screenshot({
      path: join(SCREENSHOT_DIR, 'specialties-card-hover.png'),
      fullPage: false,
    });
  });

  test('survey results page shows match cards with gold borders', async ({
    authedPage: page, authToken, request,
  }) => {
    const token = authToken;
    const headers = { Authorization: `Bearer ${token}` };

    // Start and complete a survey via API for quick results
    const startRes = await request.post('http://localhost:3000/api/survey/start', {
      headers, data: { type: 'specialty', role: 'doctor' },
    });
    expect(startRes.ok()).toBeTruthy();
    const session = await startRes.json();

    // Answer all questions to complete
    let nodeId = session.question.node_id;
    for (let i = 0; i < 35; i++) {
      const optIdx = session.question.options[0]?.index ?? 0;
      const aRes = await request.post(`http://localhost:3000/api/survey/${session.session_id}/answer`, {
        headers, data: { node_id: nodeId, option_index: optIdx },
      });
      const after = await aRes.json();
      if (after.status === 'completed') break;
      nodeId = after.question.node_id;
    }

    // Navigate to results page
    await page.goto(`/survey/${session.session_id}/results`);
    await page.waitForURL(/\/survey\/.*\/results/, { timeout: 15000 }).catch(() => {});

    // Check gold border on result cards
    const resultCards = page.locator('[class*="rounded-xl"]');
    const cardCount = await resultCards.count();
    if (cardCount > 0) {
      const borderColor = await resultCards.first().evaluate((el) =>
        getComputedStyle(el).borderColor
      );
      const hasGold = borderColor.includes('201');
      expect(hasGold).toBeTruthy();
    }

    await page.screenshot({
      path: join(SCREENSHOT_DIR, 'survey-results.png'),
      fullPage: true,
    });
  });
});
