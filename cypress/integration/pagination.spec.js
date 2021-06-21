/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  // https://on.cypress.io/interacting-with-elements

  it(".type() - type into a DOM element", () => {
    // https://on.cypress.io/type
    // testing first and last button
    cy.wait(3000);
    cy.get("[data-cy=btn-last]").click();
    cy.wait(3000);
    cy.get(`[data-cy=btn-first]`).click();

    // test the search
    cy.get(`[data-cy=movie-search]`).type("titanic");
    cy.get(`[data-cy=btn-search]`).click();
    cy.wait(3000);
    cy.get(`[data-cy=btn-page-22]`).should("be.visible");
    // cy.get(`[data-cy=btn-page-25]`).should("be.not.visible");



  });
});
