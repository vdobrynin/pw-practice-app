import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();
const baseURL =
    process.env.DEV === '1'
        ? 'http://localhost:4201/'
        : process.env.STAGING === '1'
            ? 'http://localhost:4202/'
            : 'http://localhost:4200/';

export default defineConfig<TestOptions>({
    use: {
        globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
        baseURL: 'http://localhost:4200/',
    },

    projects: [
        {
            name: 'chromium',
        }
    ]
});
