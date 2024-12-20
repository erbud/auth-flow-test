import { Page, test, expect } from "@playwright/test";
import { AuthInputsType } from "@/lib/definitions";

test('Should validate the sign-in data correctly', async ({ page }) => {
  const newUser: AuthInputsType = {
    email: 'earvins@hotmail.com',
    password: 'xm2m74$38nX398'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(false);
});

test('Should show an error when trying to access with unregistered email', async ({ page }) => {
  const newUser: AuthInputsType = {
    email: 'paquito@javascript.com',
    password: 'xm2m74$38nX398'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(true);
});

test('Should show an error when trying to access with unverified email', async ({ page }) => {
  const newUser: AuthInputsType = {
    email: 'decompeti.app@gmail.com',
    password: 'xm2m74$38nX398'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(true);
});

test('Should show an error when trying to access with invalid password', async ({ page }) => {
  const newUser: AuthInputsType = {
    email: 'earvins@hotmail.com',
    password: 'd093904U0!mc8390475'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(true);
});

async function flow({ 
  page,
  newUser
}: {
  page: Page;
  newUser: AuthInputsType;
}) {
  await page.goto('/sign-in');

  const headerSection = page.locator('#sign-in h1');
  const emailInput = page.locator('input#email');
  const passwordInput = page.locator('input#password');
  const submitButton = page.locator('button[type=submit]', { hasText: 'Acceder'});

  await emailInput.fill(newUser.email);
  await passwordInput.fill(newUser.password);
  
  await expect(headerSection).toContainText('Iniciar sesión');
  await expect(emailInput).toHaveAttribute('name', 'email');
  await expect(emailInput).toHaveValue(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  await expect(passwordInput).toHaveAttribute('name', 'password');
  await expect(passwordInput).toHaveValue(/[A-Z]/);
  await expect(passwordInput).toHaveValue(/[a-z]/);
  await expect(passwordInput).toHaveValue(/[0-9]/);
  await expect(passwordInput).toHaveValue(/[#?!@$%^&*-]/);
  await expect(passwordInput).toHaveValue(/.{8,}/);

  await submitButton.click();
  await page.waitForTimeout(1000);
  
  const errors = await page.locator('input.error-mark').count() > 0;

  return errors;
}