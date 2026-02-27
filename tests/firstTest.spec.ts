import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')                    // ---> after setup env var url at config 
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
    // find by tag name                                                           // #24 *02.26.2026
    await page.locator('input').first().click() // --> find first input

    // find by id
    page.locator('#inputEmail1') // this one doing nothing

    // find by class value
    page.locator('.shape-rectangle')  // -->.<-- looking for class with separate values

    // find by attribute
    page.locator('[placeholder="Email"]') //.first().click() // this a click on input

    // find by class value (full value)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // find combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle') //do not put space between attributes

    // find combine different selectors
    page.locator('input[placeholder="Email"][nbinput]') //do not put space between 2nd attributes

    // find by XPath --> (NOT RECOMMENDED)
    // page.locator('//*[@id="inputEmail1]')    // --> NOT RECOMMENDED ***

    // find by partial text page match
    page.locator(':text("Using)')

    // find by exact text match
    page.locator(':text-is("Using the Grid)')
})

test('user facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()     // #25 user-facing locators
    await page.getByRole('button', { name: "Sign in" }).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('SignIn').click() //--> custom id by me(add in html - in source code *** 'data-testid="SignIn'") 'data-testid' reserve word
    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()     // #26 child elements
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click() // chain locators one by one
    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click() // combination of locator & byRole
    // // await page.locator('nb-card').nth(3).getByRole('button').click()    //--> try to avoid by index ***
})

test('location parent element', async ({ page }) => {               // #27 --> nb-card <-- uniq locator
    await page.locator('nb-card', { hasText: "Using the Grid" })
        .getByRole('textbox', { name: "Email" }).click()            // with text

    await page.locator('nb-card', { has: page.locator('#inputEmail1') })
        .getByRole('textbox', { name: "Email" }).click()            // with email

    await page.locator('nb-card')
        .filter({ hasText: "Basic form" })
        .getByRole('textbox', { name: "Email" }).click()            // with filter

    await page.locator('nb-card')
        .filter({ has: page.locator('.status-danger') })
        .getByRole('textbox', { name: "Password" }).click()         // choose color & password

    await page.locator('nb-card')                           
        .filter({ has: page.locator('nb-checkbox') })               // two filters
        .filter({ hasText: "Sign in" })
        .getByRole('textbox', { name: "Email" }).click()

    // await page.locator(':text-is("Using the Grid")')
    //     .locator('..')
    //     .getByRole('textbox', { name: "Password" }).click()  //--> can use it, but not recommend
})

test('reusing the locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    const passwordField = basicForm.getByRole('textbox', { name: "Password" })

    await emailField.fill('test@test.com')
    await passwordField.fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com') // --> assertion for email
    await expect(passwordField).toHaveValue('Welcome123') // --> assertion for password
})

test('extracting values', async ({ page }) => {
    //--> single text value
    const basicForm = page.locator('nb-card')
        .filter({ hasText: "Basic form" })
    const buttonText = await basicForm
        .locator('button').textContent()
    expect(buttonText).toEqual('Submit')    // assertion

    // --> all text values
    const allRadioButtonsLabels = await page.locator('nb-radio')
        .allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    // --> input value
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({ page }) => {
    const basicFormButton = page.locator('nb-card')
        .filter({ hasText: "Basic form" })
        .locator('button')

    // --> general assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // --> locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // --> soft assertion
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})