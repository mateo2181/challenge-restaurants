import { test, expect } from '@playwright/test';


test('Login Page: should show an error when an user login with an unexisting account.', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('Email').fill('userwithnoaccount@gmail.com');
    await page.getByPlaceholder('Password').fill('noaccountpassword');
    await page.getByRole('button', { name: 'Entrar' }).click();
    await expect(page.getByText('User not found')).toBeVisible();
});