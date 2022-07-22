describe("Github Search test", () => {
  it("Searches for repos", () => {
    cy.visit("http://localhost:3000/");

    cy.get("#searchInput").type("asd");

    cy.get(".container").contains("Search").click();

    cy.get(".page-link").contains("2").click();

    cy.get(".child").contains("asdf").click();

    cy.get(".child").get('[data-cy="repo-url"]').should("exist");

    cy.get('[data-cy="back-button"]').click();

    cy.get(".child").should("exist");
  });
});

export {};
