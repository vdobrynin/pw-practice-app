import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
    use: {
        globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
        baseURL: 'http://localhost:4200/',
    },

    projects: [
        {
            name: 'chrome',
        }
    ],
});
