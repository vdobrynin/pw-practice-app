import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright";

test.beforeEach(async ({ page }) => {           // after setup env var url at config
    await page.goto('/')
})

test('navigate to form page @smoke @regression', async ({ page }) => { // #71.1
// test('navigate to form page @smoke', async ({ page }) => {  // #71.1
// test('navigate to form page', async ({ page }) => {      // before #71
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods @smoke', async ({ page }) => {   // #71.1
// test('parametrized methods', async ({ page }) => {          // before #71
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName() // #63 --> will replace ALL SPACES that found in text: (/\s+/g, '')                                 
    const randomEmail = `${randomFullName.replace(/\s+/g, '')}${faker.number.int(1000)}@test.com` // #63

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage()
        .submitUsingTheGridFormWithCredentialsAndSelectedOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await page.screenshot({ path: 'screenshots/formsLayoutsPage1.png', fullPage: true }) // --> screenshot of test
    await pm.onFormLayoutsPage()
        .submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)//with true check box on, w/false empty
    await page.screenshot({ path: 'screenshots/formsLayoutsPage2.png', fullPage: true })
    const buffer = await page.screenshot()   // --> save in binary
    // console.log(buffer.toString('base64')) // if need to print to console
    await page.locator('nb-card', { hasText: "Inline form" })
        .screenshot({ path: 'screenshots/inlineForm.png' }) // -->screenshot for test specific area
  
    // await pm.navigateTo().datepickerPage()      // #63 temporary was comment next 3 for test faker
    // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(7)
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(3, 12)
})

test('testing with argos ci', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "form layout page");
    await pm.navigateTo().datepickerPage()
    await argosScreenshot(page, "datepicker page");
})