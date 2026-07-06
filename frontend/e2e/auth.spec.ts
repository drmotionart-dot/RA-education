import { test, expect } from '@playwright/test';
import { API_BASE, uniqueMobile, getToken } from './helpers/auth';

test.describe('Auth Flow', () => {
  test('request OTP -> verify OTP -> receive JWT', async ({ request }) => {
    const mobile = uniqueMobile();

    const reqRes = await request.post(`${API_BASE}/auth/otp/request`, {
      data: { mobile_number: mobile },
    });
    expect(reqRes.ok()).toBeTruthy();

    const otpFile = `${process.env.TMP || '/tmp'}/otp_${mobile.replace(/[^0-9]/g, '')}.txt`;
    let otp = '';
    for (let i = 0; i < 30; i++) {
      const fs = await import('fs');
      try {
        otp = fs.readFileSync(otpFile, 'utf8').trim();
        if (otp) break;
      } catch { /* retry */ }
      await new Promise((r) => setTimeout(r, 500));
    }
    expect(otp).toMatch(/^\d{6}$/);

    const verifyRes = await request.post(`${API_BASE}/auth/otp/verify`, {
      data: { mobile_number: mobile, code: otp },
    });
    expect(verifyRes.ok()).toBeTruthy();
    const body = await verifyRes.json();
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
    expect(body.mobile_number).toBe(mobile);
  });

  test('invalidate on too many attempts', async ({ request }) => {
    const mobile = uniqueMobile();
    const token = await getToken(request, mobile);

    for (let i = 0; i < 5; i++) {
      const res = await request.post(`${API_BASE}/auth/otp/verify`, {
        data: { mobile_number: mobile, code: '000000' },
      });
      expect(res.ok()).toBeFalsy();
    }

    const res = await request.post(`${API_BASE}/auth/otp/verify`, {
      data: { mobile_number: mobile, code: token.slice(0, 6) },
    });
    expect(res.ok()).toBeFalsy();
  });
});

test.describe('Onboarding', () => {
  test('submit profile -> GET /me returns user', async ({ request }) => {
    const mobile = uniqueMobile();
    const token = await getToken(request, mobile);

    const onboardRes = await request.post(`${API_BASE}/users/onboard`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: 'Test Doctor', role: 'doctor' },
    });
    expect(onboardRes.ok()).toBeTruthy();

    const meRes = await request.get(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(meRes.ok()).toBeTruthy();
    const me = await meRes.json();
    expect(me.name).toBe('Test Doctor');
    expect(me.mobile_number).toBe(mobile);
  });

  test('accepts partial profile and fills defaults', async ({ request }) => {
    const mobile = uniqueMobile();
    const token = await getToken(request, mobile);

    const res = await request.post(`${API_BASE}/users/onboard`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { role: 'doctor' },
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.role).toBe('doctor');
    expect(body.mobile_number).toBe(mobile);
  });
});
