import { test, expect } from './base';

test('Register page: new account is created correctly', async ({ page }) => {
  await page.goto('/register');

  await page.getByPlaceholder('Añade tu email').fill('thisisanewaccount4@gmail.com');
  await page.getByPlaceholder('Añade tu nombre').fill('accountname4');
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.getByPlaceholder('Password').fill('pwd654321');
  
  const responsePromise = page.waitForResponse('**/auth/signup');
  await page.getByRole('button', { name: 'Finalizar' }).click();

  const response = await responsePromise;
  await expect(response.status()).toBe(201);
});