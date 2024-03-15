import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
    timeout: 55000,
    globalTimeout: 120000,
    expect: {
        timeout: 2000
    },

    retries: 1,
    reporter: 'html',

    use: {
        globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
        baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
            : process.env.STAGING === '1' ? 'http://localhost:4202/'
                : 'http://localhost:4200/',

        trace: 'on-first-retry',
        navigationTimeout: 25000,
        video: {
            mode: 'off',
            size: { width: 1920, height: 1080 }
        }
    },

    projects: [
        {
            name: 'dev',
            use: {
                ...devices['Desktop Chrome'],
                baseURL: 'http://localhost:4201/'
            },
        },
        {
            name: 'chromium',
            timeout: 55000,      //---> example how to overwrite global timeout in project
        },
        {
            name: 'firefox',
            use: {
                browserName: 'firefox',
                video: {           //---> example to take video overwrite global only with firefox   
                    mode: 'on',
                    size: { width: 1920, height: 1080 }
                }
            }
        },
        {
            name: 'pageObjectFullScreen',
            testMatch: 'usePageObjects.spec.ts',
            use: {
                viewport: { width: 1920, height: 1080 }
            }
        },
    ],
});
