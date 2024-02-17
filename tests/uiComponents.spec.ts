import { test, expect } from '@playwright/test'
import { dialog } from 'electron'
import { filter } from 'rxjs/operators'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" })
            .getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('test2@test.com')
        // await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 300 })

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        expect(inputValue).toEqual('test2@test.com')
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "Using the Grid" })

        // await usingTheGridForm.getByLabel('Option 1')
        //     .check({ force: true })         //to click use {force: true} --> cause it's hidden  
        await usingTheGridForm.getByRole('radio', { name: "Option 1" })
            .check({ force: true })

        const radioStatus = await usingTheGridForm.getByRole('radio', { name: "Option 1" })
            .isChecked()
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', { name: "Option 1" }))
            .toBeChecked()

        await usingTheGridForm.getByRole('radio', { name: "Option 2" })
            .check({ force: true })
        expect(await usingTheGridForm.getByRole('radio', { name: "Option 1" }).isChecked())
            .toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', { name: "Option 2" }).isChecked())
            .toBeTruthy()
    })
})

test('checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', { name: "Hide on click" }).uncheck({ force: true })
    await page.getByRole('checkbox', { name: "Prevent arising of duplicate toast" }).check({ force: true })

    const allBoxes = page.getByRole('checkbox')
    // for (const box of await allBoxes.all()) {
    //     await box.check({ force: true })
    //     expect(await box.isChecked()).toBeTruthy() // to check all boxes
    // }

    for (const box of await allBoxes.all()) {
        await box.uncheck({ force: true })
        expect(await box.isChecked()).toBeFalsy() // to uncheck all boxes
    }
})

test('lists and dropouts', async ({ page }) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list')      // when the list has UL tag
    page.getByRole('listitem')  // when the list has LI tag

    // const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')     // teacher prefer!
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]) // check to all
    await optionList.filter({ hasText: "Cosmic" }).click()  // cosmic only

    const header = page.locator('nb-layout-header')         // check the header color
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropDownMenu.click()          // to open dropdown
    for (const color in colors) {
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != "Corporate") {
            await dropDownMenu.click()      // to re-open dropdown
        }
    }
})

test('tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', { hasText: 'Tooltip Placements' })
    await toolTipCard.getByRole('button', { name: 'Top' }).hover()

    page.getByRole('tooltip')           // this way will work if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('dialog boxes', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', { hasText: 'mdo@gmail.com' })
        .locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('web tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1st get the row by any test in this row
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' })
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    // 2nd get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', { name: '11' })
        .filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRowById.locator('.nb-edit').click()

    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    // 3d test filter of the table
    const ages = ['20', '30', '40', '200']

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)              // hardcoded delay

        const ageRows = page.locator('tbody tr')
        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()

            if (age == '200') {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

test('datepicker', async ({ page }) => {
    //                                         // datepicker part1
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date()
    date.setDate(date.getDate() + 1)
    const expectedDate = date.getDate().toString() // dynamic date + 1 --> to find date
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' }) // short month
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    await page.locator('[class="day-cell ng-star-inserted"]')
        .getByText(expectedDate, { exact: true }).click()// wait only of this month locator & use {exact: true}
    await expect(calendarInputField).toHaveValue(dateToAssert)
})
