describe('Form - testing our form input', function () {
    beforeEach(() => {
        cy.visit("http://localhost:3000/pizza");
    });
    it("add text to input and submit form", function () {
        cy.get('[data-cy="name"]')
        .type("Luis")
        .should("have.value", "Luis");

        cy.get('[data-cy="dropdown"]')
        .select("Large")

        cy.get('[type="checkbox"]')
        .check()
        .should("be.checked");

        cy.get('[data-cy="text"]')
        .type("ASAP")
        .should("have.value", "ASAP");

        cy.get('[data-cy="submit"]')
        .click();
    });
});