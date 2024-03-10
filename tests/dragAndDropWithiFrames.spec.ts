import { test, expect } from '@playwright/test'

test('drag & drop with iframes', async ({ page }) => {

    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')

    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', { hasText: 'High Tatras 2' })
        .dragTo(frame.locator('#trash'))                    // drag & drop by Id

    // more precise control
    await frame.locator('li', { hasText: 'High Tatras 4' }).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras 2", "High Tatras 4"]) //findTrashThen child.El.Then 2nd child.El.
})