import { test } from '../test-options'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test('parametrized methods', async ({ page }) => { // we remove from ({, formLayoutsPage })

    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    //                                         //--> will replace all spaces that found in text: (/\s+/g, '')
    const randomEmail = `${randomFullName.replace(/\s+/g, '')}${faker.number.int(1000)}@test.com`

    await pm.onFormLayoutsPage()
        .submitUsingTheGridFormWithCredentialsAndSelectedOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pm.onFormLayoutsPage()
        .submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
}) 