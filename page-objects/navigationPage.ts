import { Page } from "playwright/test"

export class NavigationPage {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datepickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()

    }

    async smartTablePage() {
        await this.page.getByText('Tables & Data').click()
        await this.page.getByText('Smart Table').click()
    }

    async toastr() {
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Toastr').click()

    }

    async tooltip() {
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await groupMenuItem.click() // check if menu collapse or not
        }
    }
}