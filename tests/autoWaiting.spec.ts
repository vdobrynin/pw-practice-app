import { test, expect } from '@playwright/test';
import { timeout } from 'rxjs/operators';

test.beforeEach(async ({ page }, testInfo) => {
    // await page.goto(process.env.URL)                                // #67 change from below
    await page.goto('http://uitestingplayground.com/ajax')                  // #31 auto-waiting
    await page.getByText('Button Triggering AJAX Request').click();
    // testInfo.setTimeout(testInfo.timeout + 5000) //--> add +5 sec timeout (need to kill my VPN) // #32
})

test('auto-waiting', async ({ page }) => {                  // #31
    const successButton = page.locator('.bg-success')
    // await successButton.click()

    // const text = await successButton.textContent()              // #31
    // expect(text).toEqual('Data loaded with AJAX get request.')  // assertion 'toEqual'

    // await successButton.waitFor({ state: "attached" })    // variation for wait certain condition
    // const text = await successButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.') // with diff assertion 'toContain'

    await expect(successButton)
        .toHaveText('Data loaded with AJAX get request.', { timeout: 20000 }) //--> overwriting to 20 sec
})

test('alternative waits', async ({ page }) => {         // #31.1 --> need to kill my VPN
    //      //test.slow()
    const successButton = page.locator('.bg-success')

    //      // #1 wait for element                   // #31.1
    // await page.waitForSelector('.bg-success')    // #31.1

    //      // #2 wait for particular response           // #31.2
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata') // #31.2 waiting for networking request

    //      // #3 wait for network calls to be completed ('NOT RECOMMENDED')        // #31.3
    // await page.waitForLoadState('networkidle')      // #31.3 comment (luck of success) // #31.3

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('timeouts', async ({ page }) => {          // #32
    // test.setTimeout(20000)
    // test.slow()
    const successButton = page.locator('.bg-success')
    // await successButton.click({ timeout: 16000 }) // ~15480 this'll override actionTimeout in .*config.ts file
    await successButton.click()
})