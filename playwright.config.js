// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';


export default defineConfig({
  // Limit the number of workers on CI, use default locally
  workers: process.env.CI ? 2 : undefined,
});

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  //Maximum time one test can run for
   timeout: 30 *1000,
   expect : {
    timeout: 50 *1000,
   },

   reporter : 'html',

  use: {
    browserName : 'chromium',
    headless : true,
    trace: 'on',
   

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
  },

 
});
module.exports =  config

