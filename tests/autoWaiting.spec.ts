import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    // await page.goto(process.env.URL) 
    await page.getByText('Button Triggering AJAX Request').click();
    // testInfo.setTimeout(testInfo.timeout + 2000) // --> the way add +2 sec timeout
})

test.skip('auto waiting', async ({ page }) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()
    // const text = await successButton.textContent()
    // expect(text).toEqual('Data loaded with AJAX get request.')

    await successButton.waitFor({ state: "attached" })    // variation for wait
    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.') // with diff assertion

    await expect(successButton)
        .toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })//--> overwriting to 20 sec
})

test.skip('alternative waits', async ({ page }) => {
    //    //test.slow()
    const successButton = page.locator('.bg-success')

    // // #1 wait for element
    // await page.waitForSelector('.bg-success')
    // await successButton.click()

    // // #2 wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
    // await successButton.click()

    // #3 wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')
    await successButton.click()

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test.skip('timeouts', async ({ page }) => {
    // test.setTimeout(20000)
    // test.slow()
    const successButton = page.locator('.bg-success')
    await successButton.click()
})