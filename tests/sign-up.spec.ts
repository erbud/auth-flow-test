import { Page, test, expect } from "@playwright/test";
import { SignupInputsType } from "@/lib/definitions";

test('Should register a new and valid email', async ({ page }) => {
  const newUser: SignupInputsType = {
    email: 'decompeti.app@gmail.com',
    password: 'xm2m74$38nX398',
    passwordConfirm: 'xm2m74$38nX398'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(false);
});

test('Should show an error when trying to register widthout email', async ({ page }) => {
  const newUser: SignupInputsType = {
    email: '',
    password: 'xm2m743$8nX398',
    passwordConfirm: 'xm2m743$8nX398'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(true);
});

test('Should show an error when trying to register with invalid password', async ({ page }) => {
  const newUser: SignupInputsType = {
    email: 'earvins@hotmail.com',
    password: 'xm2m7438nX398',
    passwordConfirm: 'xm2m7438nX398'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(true);
});

test('Should show an error when trying to register a email pending to verify', async ({ page }) => {
  const newUser: SignupInputsType = {
    email: 'decompeti.app@gmail.com',
    password: 'd093904u0!mc8390475',
    passwordConfirm: 'd093904u0!mc8390475'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(true);
});

test('Should show an error when trying to register a previously registered email', async ({ page }) => {
  const newUser: SignupInputsType = {
    email: 'aroyofla@gmail.com',
    password: 'd093904u0!mc8390475',
    passwordConfirm: 'd093904u0!mc8390475'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(true);
});

async function flow({ 
  page,
  newUser
}: {
  page: Page;
  newUser: SignupInputsType;
}) {
  await page.goto('/sign-up');

  const headerSection = page.locator('#sign-up h1');
  const emailInput = page.locator('input#email');
  const passwordInput = page.locator('input#password');
  const passwordConfirmInput = page.locator('input#password-confirm');
  const submitButton = page.locator('button[type=submit]', { hasText: 'Aceptar'});

  await emailInput.fill(newUser.email);
  await passwordInput.fill(newUser.password);
  await passwordConfirmInput.fill(newUser.passwordConfirm);
  
  await expect(headerSection).toContainText('Crear cuenta');
  await expect(emailInput).toHaveAttribute('name', 'email');
  await expect(emailInput).toHaveValue(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  await expect(passwordInput).toHaveAttribute('name', 'password');
  await expect(passwordConfirmInput).toHaveAttribute('name', 'passwordConfirm');

  await submitButton.click();
  await page.waitForTimeout(1000);
  
  const errors = await page.locator('.error-message').count() > 0;

  return errors;
}