# Automation Anywhere Assignment

## Project Overview

This project automates the following Automation Anywhere Community Edition use cases using **Playwright** with **TypeScript** and the **Page Object Model (POM)** design pattern.

### Use Case 1 – UI Automation

Automates the Form Creation workflow:

- Login to Automation Anywhere Community Edition
- Navigate to **Automation**
- Create a new Form
- Add Text Box control
- Add Select File control
- Configure mandatory fields
- Save the Form
- Verify UI interactions and successful save

### Use Case 2 – API Automation

Automates the Process Creation workflow using REST APIs.

The API tests perform:

- Authentication
- Retrieve Private Workspace Folder
- Create Form
- Save Form Content
- Save Form Dependencies
- Create Process
- Save Process Content
- Save Process Dependencies

---

# Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test Runner
- Page Object Model (POM)

---

# Project Structure

```
AutomationAnywhereAssignment
│
├── pages
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── AutomationPage.ts
│   └── FormBuilderPage.ts
│
├── tests
│   ├── ui
│   │     formUpload.spec.ts
│   │
│   └── api
│         processCreation.spec.ts
│
├── utils
│
├── test-data
│     sample.pdf
│
├── auth
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── README.md
```

---

# Prerequisites

Install:

- Node.js (v18 or above)
- Git
- Visual Studio Code
- Playwright

---

# Installation

Clone the repository

```bash
git clone https://github.com/<your-username>/AutomationAnywhereAssignment.git
```

Go to project folder

```bash
cd AutomationAnywhereAssignment
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
AA_BASE_URL=https://community.cloud.automationanywhere.digital

AA_USERNAME=your_email@example.com

AA_PASSWORD=your_password

TOKEN=your_auth_token

PRIVATE_FOLDER_ID=33023132
```

> **Note:** Do not commit the `.env` file to GitHub.

---

# Execute UI Tests

Run all UI tests

```bash
npx playwright test tests/ui
```

Run a specific UI test

```bash
npx playwright test tests/ui/formUpload.spec.ts
```

Run in headed mode

```bash
npx playwright test --headed
```

Run only Chromium

```bash
npx playwright test --project=chromium
```

---

# Execute API Tests

Run API tests

```bash
npx playwright test tests/api
```

---

# Generate HTML Report

```bash
npx playwright show-report
```

---

# Assertions Implemented

### UI Assertions

- Login successful
- Automation page opens
- Create Form page opens
- Text Box is added
- Select File is added
- Mandatory field validation
- Save button visibility
- Form saved successfully

### API Assertions

- HTTP Status Codes (200/201)
- Authentication successful
- Form ID generated
- Form content saved
- Dependencies saved
- Process ID generated
- Process content saved
- Process dependencies saved

---

# Design Pattern

This framework follows the **Page Object Model (POM)**.

Advantages:

- Reusable code
- Easy maintenance
- Better readability
- Scalable framework

---

# Test Data

Sample upload document is available in

```
test-data/sample.pdf
```

---

# Reports

After execution, Playwright generates:

```
playwright-report/
```

Open the report using

```bash
npx playwright show-report
```

---

# Author

**Janavi H Gowda**

