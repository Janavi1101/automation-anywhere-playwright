import { test, expect, chromium } from '@playwright/test';
import path from 'path';

test.setTimeout(90_000);

test('UC1 - upload a PDF and submit the Intern Upload Process form', async () => {
  const context = await chromium.launchPersistentContext(
    'auth/browser-profile',
    { headless: false }
  );

  const page = context.pages()[0] ?? await context.newPage();
  const pdfPath = path.join(
    process.cwd(),
    'fixtures',
    'sample.pdf'
  );

  try {
    await page.goto(
      'https://community.cloud.automationanywhere.digital/#/home'
    );

    await expect(page).not.toHaveURL(/\/login/);

    await page.getByRole('link', {
      name: 'Automation',
      exact: true,
    }).click();

    const processLink = page.getByRole('link', {
      name: 'Intern Upload Process',
    });

    await expect(processLink).toBeVisible();
    await processLink.click();

    const taskPagePromise = page.waitForEvent('popup');

    await page.locator('button').filter({ hasText: 'Run' }).click();

    const taskPage = await taskPagePromise;

    await taskPage.getByRole('button', { name: 'Confirm' }).click();

    const employeeName = taskPage.getByRole('textbox', {
      name: 'Enter text',
    });

    await expect(employeeName).toBeVisible();
    await employeeName.fill('Janavi');

    const uploadInput = taskPage.getByLabel('browse');

    await uploadInput.setInputFiles(pdfPath);

    await expect(
      taskPage.getByRole('button', { name: 'Submit Form' })
    ).toBeVisible();

    await taskPage.getByRole('button', { name: 'Submit Form' }).click();
  } finally {
    await context.close();
  }
});