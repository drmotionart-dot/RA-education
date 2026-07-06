import { test, expect, API_BASE } from './helpers/auth';

test.describe('Landing Page', () => {
  test('renders hero section with branding and CTAs', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: /RA Education/i }).first()).toBeVisible();

    const getStarted = page.getByRole('button', { name: 'Get Started' });
    await expect(getStarted.first()).toBeVisible();

    const logIn = page.getByRole('button', { name: 'Log In' });
    await expect(logIn.first()).toBeVisible();
  });

  test('Get Started navigates to register', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Get Started/i }).first().click();
    await page.waitForURL('/register');
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  });

  test('Log In navigates to login page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Log In/i }).first().click();
    await page.waitForURL('/login');
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });

  test('renders feature sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await expect(page.getByRole('heading', { name: 'Specialty Discovery' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Adaptive Assessment' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Structured Study Plans' })).toBeVisible();
    await expect(page.getByText('How RA Education works for you')).toBeVisible();
    await expect(page.getByText('From start to study plan')).toBeVisible();
  });

  test('theme toggle is present and functional', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByTitle('Toggle theme').first();
    await expect(toggle).toBeVisible();

    const initialClass = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    await toggle.click();
    await page.waitForTimeout(400);
    const afterClass = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    expect(afterClass).toBe(!initialClass);
  });
});

test.describe('Login Page', () => {
  test('renders login form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
    await expect(page.getByPlaceholder('01012345678 or you@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
    await expect(page.getByText('Forgot password?')).toBeVisible();
    await expect(page.getByText('Create one')).toBeVisible();
  });

  test('forgot password link navigates', async ({ page }) => {
    await page.goto('/login');
    await page.getByText('Forgot password?').click();
    await page.waitForURL('/forgot-password');
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
  });

  test('create account link navigates', async ({ page }) => {
    await page.goto('/login');
    await page.getByText('Create one').click();
    await page.waitForURL('/register');
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  });
});

test.describe('Register Page', () => {
  test('renders registration form', async ({ page }) => {
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
    await expect(page.getByPlaceholder('Your full name')).toBeVisible();
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('At least 8 characters')).toBeVisible();
    await expect(page.getByText('National ID')).toBeVisible();
    await expect(page.getByText('Date of Birth')).toBeVisible();
    await expect(page.getByText('Gender')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();
  });

  test('password mismatch shows validation', async ({ page }) => {
    await page.goto('/register');
    await page.getByPlaceholder('Your full name').fill('Test User');
    await page.getByPlaceholder('you@example.com').fill('test@example.com');
    await page.getByPlaceholder('At least 8 characters').fill('password123');
    await page.getByPlaceholder('Repeat your password').fill('different456');
    await page.getByRole('button', { name: 'Create Account' }).click();
    await page.waitForTimeout(1000);
    const url = page.url();
    expect(url).toContain('/register');
  });
});
