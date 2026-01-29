//Positive Test Case: Verify that a user can sign in successfully with valid credentials.
describe("Sign In Form", () => {
  it("should allow user to sign in successfully", () => {
    // Use custom login command
    cy.login("Admin", "admin123");
    cy.allure().severity("critical");

  });
});

//Negative Test Case: Verify that an error message is displayed when a user attempts to sign in with invalid credentials.

describe("OrangeHRM Login Scenarios", () => {
  beforeEach(() => {
    cy.visit("/web/index.php/auth/login");
  });

  // ❌ NEGATIVE TEST CASES BELOW

  it("should show error for invalid username", () => {
    cy.get('input[name="username"]').type("InvalidUser");
    cy.get('input[name="password"]').type("admin123");
    cy.get("button").contains("Login").click();
    cy.get(".oxd-alert-content-text").should(
      "contain.text",
      "Invalid credentials"
    );
  });

  it("should show error for invalid password", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get("button").contains("Login").click();
    cy.get(".oxd-alert-content-text").should(
      "contain.text",
      "Invalid credentials"
    );
  });

  it("should show validation for empty username and password", () => {
    cy.get("button").contains("Login").click();
    cy.get(".oxd-input-field-error-message")
      .should("contain.text", "Required")
      .and("be.visible");
  });

  it("should show validation for empty username only", () => {
    cy.get('input[name="password"]').type("admin123");
    cy.get("button").contains("Login").click();
    cy.get(".oxd-input-field-error-message")
      .first()
      .should("contain.text", "Required");
  });

  it("should show validation for empty password only", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get("button").contains("Login").click();
    cy.get(".oxd-input-field-error-message").should("contain.text", "Required");
  });

  it("should not login when extra spaces are used in credentials", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type(" admin123 ");
    cy.get("button").contains("Login").click();
    cy.get(".oxd-alert-content-text").should(
      "contain.text",
      "Invalid credentials"
    );
  });

  it("should not login when password is case-sensitive", () => {
    cy.get('input[name="username"]').type("Admin");
    cy.get('input[name="password"]').type("Admin123"); // Capital 'A'
    cy.get("button").contains("Login").click();
    cy.get(".oxd-alert-content-text").should(
      "contain.text",
      "Invalid credentials"
    );
  });

  // 🛡️ SECURITY TEST CASE
  it("should prevent login and not execute code when password contains special characters or injection scripts", () => {
    const maliciousInputs = [
      "' OR '1'='1", // SQL Injection attempt
      "'; DROP TABLE users;--", // SQL Injection
      "<script>alert('XSS')</script>", // XSS attempt
      "${7*7}", // Template injection
      '" OR "" = "', // Simple bypass attempt
    ];
    maliciousInputs.forEach((malicious) => {
      cy.get('input[name="username"]').clear().type("Admin");
      cy.get('input[name="password"]')
        .clear()
        .type(malicious, { parseSpecialCharSequences: false });
      cy.get("button").contains("Login").click();
      cy.get(".oxd-alert-content-text").should(
        "contain.text",
        "Invalid credentials"
      );
    });
  });
});
