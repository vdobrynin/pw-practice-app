import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();  //---> for .env  

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  timeout: 50000,
  // globalTimeout: 120000,
  expect: {
    timeout: 2000,
    toMatchSnapshot: { maxDiffPixels: 50 } //test will not fail setup it if test not stable
  },
  // testDir: './tests',
  // /* Run tests in files in parallel */
  // fullyParallel: false,

  // /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 1,            //--> make 1 retries ***

  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  // // workers: process.env.CI ? 1 : 5,          //--->this will run 5 workers, not 4 *** 

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // reporter: 'list',                        //---> below different type of reporters ***
  // reporter: 'json',
  // reporter: [['json', { outputFile: 'test-results/jsonReport.json' }]],
  reporter: [
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['junit', { outputFile: 'test-results/junitReport.xml' }],
    //   ['allure-playwright']
    ['html']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',              // ---> default url ***
    // baseURL: 'http://localhost:4200/',

    globalQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    baseURL: process.env.DEV === '1' ? 'http://localhost:4201/'
      : process.env.STAGING === '1' ? 'http://localhost:4202/'
        : 'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {                //---> to take video as a screenshot of the tests ***
      mode: 'off',
      size: { width: 1920, height: 1080 }
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4201/'
      },
    },
    {
      name: 'staging',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4202/'
      },
    },
    {
      name: 'chrome',
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'mobile',                       //---> test for mobile devices ***
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 13 Pro']
      }
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  webServer: {                //--->setup for github actions
    command: 'npm run start',
    url: 'http://localhost:4200/',
    timeout: 120 * 1000,
  }
  // webServer: {                //--->setup for docker
  //   timeout: 2 * 60 * 1000,
  //   command: 'npm run start',
  //   url: 'http://localhost:4200/'
  // }
});