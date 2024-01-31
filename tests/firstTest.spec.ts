import { test } from '@playwright/test'

// test.beforeAll(() => {  //usually for DB
// }) 

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('suite 1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Tables & Data').click()
    })

    test('the smart table page', async ({ page }) => {
        await page.getByText('Smart Table').click()
    })

    test('the tree grid page', async ({ page }) => {
        await page.getByText('Tree Grid').click()
    })
})

test.describe('suite 2', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    })

    test('the layouts page', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker page', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })
})