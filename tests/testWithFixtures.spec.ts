import { test } from '../test-options'
import { faker } from '@faker-js/faker'

test('parametrized methods', async ({ pageManager }) => { //-->remove from({, formLayoutsPage }), then replace with pageManager
    const randomFullName = faker.person.fullName()
    //                              //--> will replace all spaces that found in text: (/\s+/g, '')
    const randomEmail = `${randomFullName.replace(/\s+/g, '')}${faker.number.int(1000)}@test.com`

    await pageManager
        .onFormLayoutsPage()
        .submitUsingTheGridFormWithCredentialsAndSelectedOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2')
    await pageManager
        .onFormLayoutsPage()
        .submitInLineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
})    