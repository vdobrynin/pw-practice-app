import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({ page }) => {           // after setup env var url at config
    await page.goto('/')
})

test('navigate to form page @smoke @regression', async ({ page }) => {

    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods @smoke', async ({ page }) => {

    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    //                                        //--> will replace all spaces that found in text: (/\s+/g, '')
    const randomEmail = `${randomFullName.replace(/\s+/g, '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage()
        .submitUsingTheGridFormWithCredentialsAndSelectedOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    // await page.screenshot({ path: 'screenshots/formsLayoutsPage.png' })//--->screenshot for test
    // const buffer = await page.screenshot()   //---> save in binary 
    // console.log(buffer.toString('base64'))
    await pm.onFormLayoutsPage()
        .submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
    // await page.locator('nb-card', { hasText: "Inline form" })
    //     .screenshot({ path: 'screenshots/inlineForm.png' })//--->screenshot for test specific area

    // await pm.navigateTo().datepickerPage()
    // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10)
    // await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
})