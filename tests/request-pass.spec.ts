import { Page, test, expect } from "@playwright/test";
import { EmailInputType } from "@/lib/definitions";

test('Should send an email to the address indicated', async ({ page }) => {
  const newUser: EmailInputType = {
    email: 'aroyofla@gmail.com'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(false);
});

test('Should show an error when trying to restore password with unverified email', async ({ page }) => {
  const newUser: EmailInputType = {
    email: 'decompeti.app@gmail.com'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(false);
});

test('Should show an error when trying to access with unregistered email address', async ({ page }) => {
  const newUser: EmailInputType = {
    email: 'paquito@javascript.com'
  };
  const errors = await flow({ page, newUser });
  expect(errors).toEqual(true);
});

async function flow({ 
  page,
  newUser
}: {
  page: Page;
  newUser: EmailInputType;
}) {
  await page.goto('/request-pass');

  const headerSection = page.locator('#request-pass h1');
  const emailInput = page.locator('input#email');
  const submitButton = page.locator('button[type=submit]', { hasText: 'Enviar e–mail'});

  await emailInput.fill(newUser.email);
  
  await expect(headerSection).toContainText('Restaurar contraseña');
  await expect(emailInput).toHaveAttribute('name', 'email');
  await expect(emailInput).toHaveValue(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  await submitButton.click();
  await page.waitForTimeout(1000);
  
  const errors = await page.locator('.error-message').count() > 0;

  return errors;
}