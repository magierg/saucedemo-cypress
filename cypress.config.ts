import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 5000,
  pageLoadTimeout: 10000,
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    setupNodeEvents(on, config) {
      require("cypress-localstorage-commands/plugin")(on, config);
      return config;
    },
  },
});
