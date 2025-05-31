import { test as base } from 'playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {
    globalQaURL: string
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({

    globalQaURL: ['', { option: true }],

    formLayoutsPage: [async ({ page }, use) => { // ---> load to any environment for all page objects
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        // console.log('Tear Down')
    }, { auto: true }],

    // formLayoutsPage: async ({ page }, use) => {    //---> dependency on on custom fixures
    //     await page.goto('/')
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layouts').click()
    //     await use('')
    //     console.log('Tear Down')
    // },

    pageManager: async ({ page }, use) => {     // ---> load to any environment for all page objects
        const pm = new PageManager(page)
        await use(pm)
    }

    // pageManager: async ({ page, formLayoutsPage }, use) => { //---> dependency on custom fixures
    //     const pm = new PageManager(page)
    //     await use(pm)
    // }
}) 