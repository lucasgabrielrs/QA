const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFolder: "cypress/support",
    //testIsolation: true, //true limpa cookies
    viewportHeight: 900,
    viewportWidth: 1440,
    experimentalRunAllSpecs: false, //true roda todos os testes
    defaultCommandTimeout: 30000,
    experimentalStudio: true,
  },
  video: false,
  watchForFileChanges: true,
});
