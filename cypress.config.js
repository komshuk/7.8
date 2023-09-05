const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'j81xst',
  e2e: {
    baseUrl: "http://qamid.tmweb.ru/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});