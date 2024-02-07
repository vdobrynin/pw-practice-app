import { test, expect } from '@playwright/test'
import { stat } from 'original-fs'

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    // await page.getByText('Form Layouts').click()
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
        .toHaveText('Data loaded with AJAX get request.', { timeout: 20000 }) //overwriting to 20 sec
})

test('alternative waits', async ({ page }) => {
    const successButton = page.locator('.bg-success')

    // #1 wait for element
    // await page.waitForSelector('.bg-success')

    // #2 wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // #3 wait for network calls to be completed ('NOT RECOMMENDED')
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect(text).toEqual('Data loaded with AJAX get request.')
})