import { test as base } from 'playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {    // #67
    globalQaURL: string        // #67
    formLayoutsPage: string     // #68
    pageManager: PageManager    // #68
}

export const test = base.extend<TestOptions>({      // #67
    globalQaURL: ['', { option: true }],            // #67
    formLayoutsPage: async ({ page }, use) => { // #68 --> load to any environment for all page objects
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        console.log('Tear Down') // #68 after 'use('')' test execution
    }, // { auto: true }], // #68

    pageManager: async ({ page, formLayoutsPage }, use) => { // #68 --> dependency on custom fixures
        const pm = new PageManager(page)
        await use(pm)
    }
}) 