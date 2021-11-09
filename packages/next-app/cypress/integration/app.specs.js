/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Navigation", () => {
  it("should navigate to home page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

  });
});
