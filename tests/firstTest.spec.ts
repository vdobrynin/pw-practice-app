import { test } from '@playwright/test'

// test.beforeAll(() => {  //usually for DB but rear
// }) 

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => {
    //by Tag name
    await page.locator('input').first().click() //find first input

    //by ID
    page.locator('#inputEmail1')

    //by Class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // //combine different selectors
    // page.locator('input[placeholder="Email"].shape-rectangle') //do not put space between

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]') //do not put space between even 2nd attr

    //by XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1]')

    //by partial page match
    page.locator(':text("Using)')

    //by exact text match
    page.locator(':text-is("Using the Grid)')
})

test('User facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('SignIn').click() //custom id by me

    await page.getByTitle('IoT Dashboard').click()
})