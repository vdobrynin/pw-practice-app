import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {

    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) //the way to override timeout
})

test('auto waiting', async ({ page }) => {

    const successButton = page.locator('.bg-success')
    // await successButton.click()
    // const text = await successButton.textContent()
    // expect(text).toEqual('Data loaded with AJAX get request.')

    // await successButton.waitFor({ state: "attached" })
    // const text = await successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJ AX get request.')

    await expect(successButton)
        .toHaveText('Data loaded with AJAX get request.', { timeout: 30000 })//--> overwriting to 30 sec
})

test('alternative waits', async ({ page }) => {

    const successButton = page.locator('.bg-success')
    // #1 wait for element
    await page.waitForSelector('.bg-success')

    // #2 wait for particular response
    // await page.waitForResponse('https://uitestingplayground.com/ajaxdata', { timeout: 30000 })

    // #3 wait for network calls to be completed ('NOT RECOMMENDED')
    // await page.waitForLoadState('networkidle')

    const text = await successButton.textContent()
    expect(text).toEqual('Data loaded with AJAX get request.')
})

test('timeouts', async ({ page }) => {
    // test.setTimeout(10000)
    test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()
})