describe("OrangeHRM PIM Scenarios", () => {
  beforeEach(() => {
    // Use custom login command
    cy.login("Admin", "admin123");
  });

  it("should navigate to PIM module and search for added employee", () => {
    cy.get(".oxd-main-menu-item").contains("PIM").click();
    cy.url().should("include", "/pim/viewEmployeeList");

    // Search Employee by Name - Search for "Test User Demo" employee
    cy.get('input[placeholder="Type for hints..."]').first().type("Test");

    // Wait for the suggestion list to appear and select the employee
    cy.get(".oxd-autocomplete-dropdown").should("be.visible");
    cy.contains(".oxd-autocomplete-dropdown div", "sww test").click();

    // Click Search Button
    cy.get("button").contains("Search").click();

    // Verify search results contain the employee
    cy.get(".oxd-table-body").should("be.visible");
    // Validate that the table row contains the employee data
    // Since first name and last name are in separate cells, check the entire row
    cy.get(".oxd-table-body .oxd-table-row").first().within(() => {
      cy.contains("sww").should("exist"); // First name + Middle name
      cy.contains("test").should("exist"); // Last name
      // cy.get('button.oxd-icon-button').click(); //edit Button
    });

    // Click Reset Button to clear the search
    // cy.get("button").contains("Reset").click();
  });
});

