/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in with a given user
       * @param username email of the user you want to log in
       * @param password user password
       * @example
       * cy.login('filip@example.com', 'i<3slovakia!')
       *
       */
      login: typeof login;
    }
  }
}

const login = (username: string, password: string) => {
  cy.session(
    username,
    () => {
      cy.visit({
        url: "/",
        method: "GET",
        failOnStatusCode: false,
      });
      if (username !== "") {
        cy.get(this.usernameInput).type(username);
      }
      if (password !== "") {
        cy.get(this.passwordInput).type(password);
      }
      cy.get(this.loginButton).click();
      cy.url().should("include", "/inventory.html");
    },
    {
      cacheAcrossSpecs: true,
    }
  );
};

Cypress.Commands.addAll({ login });
