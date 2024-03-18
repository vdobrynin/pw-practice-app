import { test, expect } from '@playwright/test';

test('input fields', async ({ page }, testInfo) => {

    await page.goto('/')
    await page.locator('.sidebar-toggle').click()    //---> click on class locator to open
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.locator('.sidebar-toggle').click()    // ---> to close

    const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })
    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.type('test2@test.com')
})