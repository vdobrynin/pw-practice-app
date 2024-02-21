import { Page, expect } from "playwright/test"

export class DatepickerPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate = date.getDate().toString() // dynamic date + 1 --> to find date
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' }) // short month
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' }) // long month
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
                .click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }

        await this.page.locator('[class="day-cell ng-star-inserted"]')
            .getByText(expectedDate, { exact: true }).click()// wait only of this month locator & use {exact: true}
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }
}