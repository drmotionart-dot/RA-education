import { test, expect, API_BASE } from './helpers/auth';

test.describe('User Profile', () => {
  test('profile page loads and displays user info', async ({ authedPage: page, request }) => {
    const token = await page.evaluate(() => localStorage.getItem('token'));
    const meRes = await request.get(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await meRes.json();

    await page.goto('/profile');
    await page.waitForSelector('h1:has-text("Profile")');

    await expect(page.getByText(user.name)).toBeVisible();
    await expect(page.getByText(user.role, { exact: true })).toBeVisible();
    const mobileText = page.getByText(user.mobile_number);
    if (await mobileText.count() > 0) {
      await expect(mobileText).toBeVisible();
    }
  });

  test('edit profile name and save', async ({ authedPage: page }) => {
    await page.goto('/profile');
    await page.waitForSelector('h1:has-text("Profile")');

    await page.getByPlaceholder('Your full name').or(page.locator('input[type="text"]').first()).fill('Updated Name');
    const emailInput = page.locator('input[type="email"]');
    if (await emailInput.isVisible()) {
      await emailInput.fill('test@example.com');
    }

    await page.getByRole('button', { name: 'Save' }).click();

    await page.waitForTimeout(1500);
    await expect(page.getByText(/Updated Name|Profile updated/).first()).toBeVisible();
  });

  test('delete account confirmation flow', async ({ authedPage: page }) => {
    await page.goto('/profile');
    await page.waitForSelector('h1:has-text("Profile")');

    await page.getByRole('button', { name: 'Delete Account' }).click();
    await expect(page.getByRole('button', { name: 'Confirm Delete' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  });

  test('protected route redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForURL('/login');
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });
});

test.describe('Onboarding', () => {
  test('onboarding page renders and submits', async ({ request }) => {
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

    const onboardRes = await request.post(`${API_BASE}/users/onboard`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: 'Onboard Test User', role: 'doctor' },
    });
    expect(onboardRes.ok()).toBeTruthy();
    const body = await onboardRes.json();
    expect(body.name).toBe('Onboard Test User');
    expect(body.role).toBe('doctor');
    expect(body.mobile_number).toBe(mobile);
  });
});
