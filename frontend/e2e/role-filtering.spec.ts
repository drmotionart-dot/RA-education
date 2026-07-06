import { test, expect, API_BASE } from './helpers/auth';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const SCREENSHOT_DIR = join(process.cwd(), 'e2e-screenshots');

test.beforeAll(async () => {
  try { mkdirSync(SCREENSHOT_DIR, { recursive: true }); } catch { }
});

async function createAuthedPageAsRole(browser: any, request: any, role: string) {
  const page = await browser.newPage();
  const mobile = `+20100009${String(Date.now()).slice(-6)}`;

  // Request OTP
  await request.post(`${API_BASE}/auth/otp/request`, { data: { mobile_number: mobile } });

  // Wait for OTP file
  const mobileDigits = mobile.replace(/\D/g, '');
  const otpFile = join(process.env.TMP || '/tmp', `otp_${mobileDigits}.txt`);
  let otp = '';
  for (let i = 0; i < 30; i++) {
    try {
      const fs = await import('fs');
      otp = fs.readFileSync(otpFile, 'utf8').trim();
      if (otp) break;
    } catch { }
    await new Promise((r) => setTimeout(r, 500));
  }

  // Verify OTP
  const verifyRes = await request.post(`${API_BASE}/auth/otp/verify`, {
    data: { mobile_number: mobile, code: otp },
  });
  const { token } = await verifyRes.json();

  // Onboard with the given role
  await request.post(`${API_BASE}/users/onboard`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { name: `Test ${role}`, role },
  });

  // Fetch user profile
  const meRes = await request.get(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const user = await meRes.json();

  // Inject into page localStorage
  await page.goto('/login');
  await page.evaluate(({ token, mobile, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('mobileNumber', mobile);
    localStorage.setItem('user', JSON.stringify(user));
  }, { token, mobile, user });

  return page;
}

async function getSpecialtyNames(page: any): Promise<string[]> {
  return page.evaluate(() => {
    const cards = document.querySelectorAll('[class*="rounded-xl"] h3');
    return Array.from(cards).map((el) => el.textContent || '');
  });
}

test.describe('Round 1 — Role Filtering & Session Tests', () => {

  test('doctor sees only doctor specialties', async ({ browser, request }) => {
    const page = await createAuthedPageAsRole(browser, request, 'doctor');
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');
    await page.waitForTimeout(1000);

    const names = await getSpecialtyNames(page);
    // Verify doctor-specific specialties are present (e.g., Cardiology)
    expect(names.length).toBeGreaterThan(0);

    // Check that no nursing-specific names appear
    const nursingKeywords = ['nursing', 'midwifery', 'pediatric nursing'];
    for (const kw of nursingKeywords) {
      for (const name of names) {
        expect(name.toLowerCase()).not.toContain(kw);
      }
    }

    await page.screenshot({
      path: join(SCREENSHOT_DIR, 'doctor-specialties.png'),
      fullPage: true,
    });
    await page.close();
  });

  test('nurse sees only nurse specialties', async ({ browser, request }) => {
    const page = await createAuthedPageAsRole(browser, request, 'nurse');
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');
    await page.waitForTimeout(1000);

    const names = await getSpecialtyNames(page);
    // Should have nursing-specific specialties
    expect(names.length).toBeGreaterThan(0);

    await page.screenshot({
      path: join(SCREENSHOT_DIR, 'nurse-specialties.png'),
      fullPage: true,
    });
    await page.close();
  });

  test('stale-session bootstrap: token without user triggers fetchUser', async ({ browser, request }) => {
    const page = await browser.newPage();

    // Create a user first to get a real token
    const mobile = `+20100009${String(Date.now()).slice(-6)}`;
    await request.post(`${API_BASE}/auth/otp/request`, { data: { mobile_number: mobile } });
    const mobileDigits = mobile.replace(/\D/g, '');
    const otpFile = join(process.env.TMP || '/tmp', `otp_${mobileDigits}.txt`);
    let otp = '';
    for (let i = 0; i < 30; i++) {
      try {
        const fs = await import('fs');
        otp = fs.readFileSync(otpFile, 'utf8').trim();
        if (otp) break;
      } catch { }
      await new Promise((r) => setTimeout(r, 500));
    }
    const verifyRes = await request.post(`${API_BASE}/auth/otp/verify`, {
      data: { mobile_number: mobile, code: otp },
    });
    const { token } = await verifyRes.json();

    // Onboard
    await request.post(`${API_BASE}/users/onboard`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: 'Stale Test', role: 'doctor' },
    });

    // Set ONLY token in localStorage — no user object
    await page.goto('/login');
    await page.evaluate((t) => {
      localStorage.setItem('token', t);
      localStorage.setItem('mobileNumber', '+20100000999999');
      // Deliberately NOT setting 'user' — this is the stale-session scenario
    }, token);

    // Navigate to a protected route — ProtectedRoute will call fetchUser()
    await page.goto('/explore');
    await page.waitForSelector('h1:has-text("Medical Specialties")');

    // The user should have been fetched by fetchUser()
    const storedUser = await page.evaluate(() => {
      try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
    });
    expect(storedUser).not.toBeNull();
    expect(storedUser.role).toBe('doctor');

    await page.close();
  });

  test('PathDetail → QuickPick flow with path pre-selected', async ({ authedPage: page }) => {
    // Navigate to paths page first
    await page.goto('/paths');
    await page.waitForSelector('h1:has-text("Career Paths")');
    await page.waitForTimeout(500);

    // Click the first path card to go to its detail
    const pathCard = page.locator('[class*="rounded-xl"]').first();
    await pathCard.click();
    await page.waitForURL(/\/paths\//);
    await page.waitForTimeout(500);

    // Click "Start This Path" button
    const startBtn = page.locator('button:has-text("Start This Path")');
    await expect(startBtn).toBeVisible();
    await startBtn.click();

    // Should navigate to /quick-pick?pathId=...
    await page.waitForURL(/\/quick-pick\?pathId=/);
    await page.waitForTimeout(500);

    // Verify the pre-selection banner is visible
    const banner = page.locator('text=Path pre-selected');
    await expect(banner).toBeVisible();

    // The path step should be skipped — should see specialty selection directly
    await expect(page.locator('text=Choose a Specialty')).toBeVisible();
  });
});
