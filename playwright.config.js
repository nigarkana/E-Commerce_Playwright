// @ts-check
import { defineConfig, devices } from '@playwright/test';



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
    headless : true
   

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    
  },

 
});
module.exports =  config

