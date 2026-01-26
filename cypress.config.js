const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'w61njn',
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    reportPageTitle: "OrangeHRM Cypress Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  e2e: {
    setupNodeEvents(on, config) {
      // Mochawesome plugin
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
    specPattern: "cypress/e2e/**/*.cy.js",
    baseUrl: "https://opensource-demo.orangehrmlive.com",
  },

  // Timeouts
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 10000,

  // Media folders (for reports)
  screenshotsFolder: "cypress/reports/screenshots",
  videosFolder: "cypress/reports/videos",
});
