import { test as base } from 'playwright/test'

export type TestOptions = {
    globalQaURL: string
}

export const test = base.extend<TestOptions>({
    globalQaURL: ['', { option: true }]
})