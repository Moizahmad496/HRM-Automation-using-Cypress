describe("OrangeHRM PIM Scenarios", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );

    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("admin123");
    cy.get("button").contains("Login").click();

    cy.url().should("include", "/dashboard");
  });

  it("should navigate to PIM module and add employee with photo", () => {
    cy.get(".oxd-main-menu-item").contains("PIM").click();
    cy.url().should("include", "/pim/viewEmployeeList");

    // Search Employee by Information
    cy.get('input[placeholder="Type for hints..."]').first().type("Testing the applicatio ");
    cy.get(".oxd-select-text-input").first().click();
    cy.contains(".oxd-select-option", "Full-Time Permanent").click(); 
    //Choosing the include field
    cy.get(".oxd-select-wrapper").eq(1).click();
    cy.contains(".oxd-select-option", "Current Employees Only").click();
    cy.get('input[placeholder="Type for hints..."]').eq(1).type("Smith");
    // Step 2: Wait for the suggestion list to appear and select the specific option
    cy.get(".oxd-autocomplete-dropdown").should("be.visible");
    cy.contains(".oxd-autocomplete-dropdown div", "Smith").click();
    //Select Job Title
    cy.get(".oxd-icon.bi-caret-down-fill").eq(3).click({ force: true });
    cy.contains(".oxd-select-dropdown div", "Finance").click();
    //Select Sub Unit
    cy.get(".oxd-icon.bi-caret-down-fill").eq(4).click({ force: true });
    cy.contains(".oxd-select-dropdown div", "Quality Assurance").click();
    //Click Search Button
    cy.get("button").contains("Search").click();
      //Click Reset Button
      cy.get("button").contains("Reset").click();

  });
});
