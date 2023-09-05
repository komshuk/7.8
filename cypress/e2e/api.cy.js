import adminLogin from "..//fixtures/admin.json";
import seats from "..//fixtures/seats.json";
import selector from "..//fixtures/selectors.json";

describe("tickets sale page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("main page, shows 7 days", () => {
    cy.get(selector.day).should("have.length", 7);
  });

  adminLogin.forEach((path) => {
    it(`should be logged into the admin - ${path.name}`, () => {
      cy.visit("http://qamid.tmweb.ru/admin");
      cy.get(selector.header).should("be.visible");
      cy.contains("Администраторррская").should("be.visible"); //Администраторррская - опечатка

      cy.get(selector.email).type(path.email);
      cy.get(selector.password).type(path.password);
      cy.get(selector.login_btn).click();

      cy.get("body").then(($body) => {
        if ($body.find("Управление залами").length > 0) {
          cy.contains("Управление залами").should("be.visible");
        } else if ($body.find("Ошибка авторизации").length > 0) {
          cy.contains("Ошибка авторизации").should("be.visible");
        }
      });
    });
  });
});