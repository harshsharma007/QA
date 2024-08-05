/// <reference types="Cypress" />

describe("My First Test Case", () => {


    it("Sing Up Form - Create Account", () => {

        cy.visit("https://stage.lennar.com")
        cy.get("#onetrust-accept-btn-handler").click()
        cy.wait(1000);
        cy.get("[data-testid='header-menu']").eq(0).click()
        cy.get("span").contains("Sign in or create").click()
        cy.contains("Get started").click()
        cy.wait(5000)
        cy.get('input[data-testid="email"]').should('not.be.disabled').type('huny.88s@gmail.com', { force: true }).type('{enter}')
        cy.get('[data-testid="email"]').should("have.value", "huny.88s@gmail.com")
        cy.get("[data-testid='sign-submit-button']").click()
        cy.get("[data-testid='password']").type("Test@1234")
        cy.get("input[name='confirmPassword']").type("Test@1234")
        cy.get("[data-testid='sign-submit-button']").click()
        cy.get("name='firstName'").type("Harsh")
        cy.get("name='lastName'").type("sharma")
        cy.get("name='phone'").type("9876543210")
        cy.get("name='legal'").click()
        cy.get("data-testid='sign-submit-button'").click()
        cy.get("#react-select-state-input").click()
    })
    
})