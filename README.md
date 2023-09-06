# Saucedemo Cypress E2E Tests

## Issues

I was not able to run the tests using default Electron browser so maybe just use Chrome.
That is the error I got when running with Electron:
```
CypressError: Timed out after waiting `10000ms` for your remote page to load.  
    Your page did not fire its `load` event within `10000ms`.
```

## Running locally
Make sure you have node.js installed - latest LTS version
Install dependencies using `npm i`
Run cypress either using `npx cypress open` or run headless with `npx cypress run --browser chrome`

## Tests

Tests are written in Typescript using Page Object Model. For faster runtime some test are modifying local storage and session cookie. 

### Folders

`/cypress/e2e` - main test folder with test files `*.cy.ts` 
`/cypress/e2e/pages` - folder with Page objects
`/cypress/e2e/fixtures` - folder with test data

## To Do

- add any missing tests
- add github action to run the test on push to `main` branch
- fork the website code and run React components tests
