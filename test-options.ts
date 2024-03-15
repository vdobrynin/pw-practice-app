import { test as base } from 'playwright/test'

export type TestOptions = {
    globalQaURL: string
    formLayoutsPage: string
}

export const test = base.extend<TestOptions>({

    globalQaURL: ['', { option: true }],

    formLayoutsPage: [async ({ page }, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
    }, { auto: true }]
})