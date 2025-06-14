import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();  // --> for .env  
// Determine baseURL from environment
const baseURL =
  process.env.DEV === '1'
    ? 'http://localhost:4201/'
    : process.env.STAGING === '1'
      ? 'http://localhost:4202/'
      : 'http://localhost:4200/';
/**
 * See https://playwright.dev/docs/test-configuration.
 */
// export default defineConfig({
export default defineConfig<TestOptions>({           // add #67
  timeout: 40000,          // --> same as default
  globalTimeout: 60000,   // --> not recommend at all (default no timeout)
  expect: {
    timeout: 2000,                        // override +2 sec
    toMatchSnapshot: { maxDiffPixels: 50 } //test will not fail setup it if test not stable
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  // fullyParallel: true,             // --> this is faster cause parallel *** default *** <---
  fullyParallel: false,                 // --> have temporary for retry's OR parallel
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,        // --> from 0 change to 1 to make retries for local computer ***
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined, // #65 should be run 5 but running 4 *** default *** fastest!!!
  // workers: process.env.CI ? 1 : 5,         // #65 --> this will run 5 workers, not 4 *** 
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // reporter: 'list',                        //---> below different type of reporters ***
  // reporter: 'json',
  // reporter: [['json', { outputFile: 'test-results/jsonReport.json' }]],
  // reporter: [
  //   // Use "dot" reporter on CI, "list" otherwise (Playwright default).
  //   process.env.CI ? ["dot"] : ["list"],
  //   // Add Argos reporter.
  //   ["@argos-ci/playwright/reporter",
  //     { // Upload to Argos on CI only.
  //       uploadToArgos: !!process.env.CI,
  //       // Set your Argos token (required if not using GitHub Actions).
  //       token: "cdac4fb8086461e51b437007afb9062c6a1b02bf",
  //     },
  //   ],
  //   ['json', { outputFile: 'test-results/jsonReport.json' }],
  //   ['junit', { outputFile: 'test-results/junitReport.xml' }],
  //   //   ['allure-playwright']
  //   ['html']
  // ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',              // --> default url
    baseURL: 'http://localhost:4200/',             // my default url
    globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // screenshot: "only-on-failure",   //---> Capture screenshot after each test failure.
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {                // --> to take video of the tests ***
      // mode: 'on',
      mode: 'off',          // --> default
      size: { width: 1920, height: 1200 }
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'staging',
      use: {
        ...devices['Desktop FireFox'],
      },
    },
    {
      name: 'chromium',
      // fullyParallel: true 
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        video: {                
          mode: 'on',
          size: { width: 1920, height: 1200 }
        }
      }
    },
    {
      name: 'pageObjectFullScreen',
      testMatch: 'usePageObjects.spec.ts',
      use: {
        viewport: { width: 1920, height: 1200 }
      }
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'mobile',                       //---> test for mobile devices ***
    //   testMatch: 'testMobile.spec.ts',
    //   use: { ...devices['iPhone 13 Pro'] }
    // }
    // {
    //   name: 'mobile',                       //---> test through viewport for mobile devices ***
    //   testMatch: 'testMobile.spec.ts',
    //   use: {
    //     viewport: { width: 414, height: 800 }
    //   }
    // }
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   // command: 'npm run start',       // default
  //   // url: 'http://127.0.0.1:3000',  // default
  //   reuseExistingServer: !process.env.CI,
  // },
  // webServer: {                // --> setup for docker
  //   timeout: 2 * 60 * 1000,
  //   command: 'npm run start',
  //   url: 'http://localhost:4200/'
  // }
});
