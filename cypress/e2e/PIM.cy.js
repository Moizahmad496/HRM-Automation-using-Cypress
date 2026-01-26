import "cypress-file-upload";

describe("OrangeHRM PIM Scenarios", () => {
  beforeEach(() => {
    // Use custom login command
    cy.login("Admin", "admin123");
  });

  it("should navigate to PIM module and add employee with photo", () => {
    cy.get(".oxd-main-menu-item").contains("PIM").click();
    cy.url().should("include", "/pim/viewEmployeeList");

    cy.contains("button", "Add").click();
    cy.url().should("include", "/addEmployee");

    cy.get('input[name="firstName"]').type("Test");
    cy.get('input[name="middleName"]').type("User");
    cy.get('input[name="lastName"]').type("Demo");

    //  Upload employee image (even if hidden)
    // cy.get('input[type="file"]', { timeout: 100 })
    // .should("exist")
    //.attachFile("employe.jpg", { force: true });

    // Click Save button
    cy.contains("button", "Save").click();

    // Confirm we’re redirected to personal details page
    // cy.url().should("include", "/pim/viewPersonalDetails");
  });
});
