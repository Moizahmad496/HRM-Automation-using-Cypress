import "cypress-file-upload";

// ***********************************************
// This example commands.js shows you how to
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

// Custom command for OrangeHRM login
Cypress.Commands.add('login', (username, password) => {
    // Visit the login page
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // Enter credentials
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);

    // Click login button
    cy.get("button").contains("Login").click();

    // Verify redirect to dashboard
    cy.url().should("include", "/dashboard");
});
