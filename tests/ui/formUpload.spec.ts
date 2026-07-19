import { test, expect, chromium } from '@playwright/test';

test.setTimeout(60_000);

test('UC1 - create and save form with textbox and file upload', async () => {
  // Uses the persistent profile where you logged in manually.
  const context = await chromium.launchPersistentContext(
    'auth/browser-profile',
    {
      headless: false,
    }
  );

  const page = context.pages()[0] ?? await context.newPage();
  const formName = `Intern Upload Form ${Date.now()}`;

  try {
    await page.goto(
      'https://community.cloud.automationanywhere.digital/#/home'
    );

    // Fails clearly if the persistent profile is not logged in.
    await expect(page).not.toHaveURL(/\/login/);

    // Open Automation.
    const automationLink = page.getByRole('link', {
      name: 'Automation',
      exact: true,
    });

    await expect(automationLink).toBeVisible();
    await automationLink.click();

    // Create a new Form.
    await page
      .getByRole('heading', { name: 'Automation Create Manage' })
      .getByLabel('Create')
      .click();

    await page.getByRole('button', { name: /Form/ }).click();

    await page.getByRole('textbox', { name: 'Name' }).fill(formName);

    await page.getByRole('button', { name: 'Create & edit' }).click();

    // The Form Builder is inside an iframe.
    const formBuilder = page.frameLocator('iframe').first();

    // Add and configure the Text Box.
    const textBoxButton = formBuilder.getByRole('button', {
      name: /Text Box/,
    });

    await expect(textBoxButton).toBeVisible();
    await textBoxButton.click();

    await formBuilder.getByRole('textbox', { name: 'TextBox' }).click();

    const elementLabel = formBuilder.getByRole('textbox', {
      name: 'Element label',
    });

    await elementLabel.fill('Employee Name');

    await expect(elementLabel).toHaveValue('Employee Name');

    await formBuilder
      .locator('label')
      .filter({ hasText: 'Make field required' })
      .click();

    // Add and configure the Select File control.
    const selectFileButton = formBuilder.getByRole('button', {
      name: /Select File/,
    });

    await expect(selectFileButton).toBeVisible();
    await selectFileButton.click();

    await elementLabel.fill('Upload Document');

    await expect(elementLabel).toHaveValue('Upload Document');

    const fileFormats = formBuilder.getByRole('textbox', {
      description:
        'E.g. doc, gif, jpg, mov, mp4, pdf, png, rtf, txt, xls, etc',
      exact: true,
    });

    await fileFormats.fill('pdf');

    await expect(fileFormats).toHaveValue('pdf');

    await formBuilder
      .locator('label')
      .filter({ hasText: 'Make field required' })
      .click();

    // Save the form.
    const saveButton = formBuilder.getByRole('button', { name: /save/i });

    await expect(saveButton).toBeVisible();
    await saveButton.click();
  } finally {
    await context.close();
  }
});