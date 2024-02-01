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
    page.locator('input')

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
}