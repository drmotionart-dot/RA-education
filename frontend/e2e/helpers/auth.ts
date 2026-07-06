import { test as base, type Page, type APIRequestContext } from '@playwright/test';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const API_BASE = 'http://127.0.0.1:3000/api';
const MOBILE_PREFIX = '+20100000';
const OTP_FILE_BASE = (process.env.TMP || '/tmp') + '/otp_';

let mobileCounter = Date.now() % 1000000;

function uniqueMobile(): string {
  mobileCounter++;
  const suffix = String(mobileCounter).slice(-6).padStart(6, '0');
  return MOBILE_PREFIX + suffix;
}

async function getToken(api: APIRequestContext, mobile: string): Promise<string> {
  const otpFile = `${OTP_FILE_BASE}${mobile.replace(/[^0-9]/g, '')}.txt`;

  const reqRes = await api.post(`${API_BASE}/auth/otp/request`, { data: { mobile_number: mobile } });
  if (!reqRes.ok()) {
    const body = await reqRes.text();
    throw new Error(`OTP request failed: ${body}`);
  }

  const otp = await waitForFile(otpFile, 15000);

  const verifyRes = await api.post(`${API_BASE}/auth/otp/verify`, {
    data: { mobile_number: mobile, code: otp },
  });
  if (!verifyRes.ok()) {
    const body = await verifyRes.text();
    throw new Error(`OTP verify failed: ${body}`);
  }
  const { token } = await verifyRes.json();
  return token;
}

async function onboardUser(api: APIRequestContext, token: string) {
  await api.post(`${API_BASE}/users/onboard`, {
    headers: { Authorization: `Bearer ${token}` },
    data: { name: 'Test Doctor', role: 'doctor' },
  });
}

async function getTokenAndOnboard(api: APIRequestContext, mobile: string): Promise<string> {
  const token = await getToken(api, mobile);
  await onboardUser(api, token);
  return token;
}

function waitForFile(filePath: string, timeoutMs: number): Promise<string> {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function poll() {
      try {
        if (existsSync(filePath)) {
          const content = readFileSync(filePath, 'utf8').trim();
          if (content) return resolve(content);
        }
      } catch { /* retry */ }
      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`OTP file not found within ${timeoutMs}ms: ${filePath}`));
      }
      setTimeout(poll, 300);
    }
    poll();
  });
}

export { expect } from '@playwright/test';
export const test = base.extend<{
  authedPage: Page;
  apiCtx: APIRequestContext;
  authToken: string;
  mobile: string;
}>({
  apiCtx: async ({ playwright }, use) => {
    const ctx = await playwright.request.newContext({ baseURL: API_BASE });
    await use(ctx);
    await ctx.dispose();
  },
  authToken: async ({ apiCtx }, use) => {
    const mobile = uniqueMobile();
    const token = await getTokenAndOnboard(apiCtx, mobile);
    await use(token);
  },
  mobile: async ({}, use) => {
    await use(uniqueMobile());
  },
  authedPage: async ({ browser, apiCtx }, use) => {
    const page = await browser.newPage();
    const mobile = uniqueMobile();
    const token = await getTokenAndOnboard(apiCtx, mobile);
    await page.goto('/login');
    await page.evaluate((t) => {
      localStorage.setItem('token', t);
      localStorage.setItem('mobileNumber', '+20100000test');
    }, token);
    await use(page);
    await page.close();
  },
});

export { uniqueMobile, getToken, API_BASE };
