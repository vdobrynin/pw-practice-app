// import { test, expect } from '@playwright/test';

// test('input fields', async ({ page }, testInfo) => {        // #72
//     await page.goto('/')
//     if (testInfo.project.name == 'mobile') {           // --> click on class locator to open menu 
//     await page.locator('.sidebar-toggle').click()  // for both platforms mobile & desktop
//     }
//     await page.getByText('Forms').click()
//     await page.getByText('Form Layouts').click()
//     if (testInfo.project.name == 'mobile') {          // --> to close menu
//     await page.locator('.sidebar-toggle').click()
//     }
//     const usingTheGridEmailInput = page
//         .locator('nb-card', { hasText: "Using the Grid" })
//         .getByRole('textbox', { name: "Email" })
//     await usingTheGridEmailInput.fill('test@test.com')
//     await usingTheGridEmailInput.clear()
//     await usingTheGridEmailInput.type('test2@test.com')
// })