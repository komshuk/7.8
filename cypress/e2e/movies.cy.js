import admin from "..//fixtures/admin.json";
import seats from "..//fixtures/seats.json";
import selector from "..//fixtures/selectors.json";

describe("tickets sale page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("main page, shows 7 days", () => {
    cy.get(selector.day).should("have.length", 7);
  });
  seats.forEach((numberOf) => {
    it(`should booking a movie in an available hall - ${numberOf.name}`, () => {
      const happyPath = admin.find(
        (path) => path.name === admin[0].name
      );
      cy.visit("http://qamid.tmweb.ru/admin");
      cy.get(selector.header).should("be.visible");
      cy.contains("Администраторррская").should("be.visible"); //Администраторррская - опечатка

      cy.get(selector.email).type(happyPath.email);
      cy.get(selector.password).type(happyPath.password);
      cy.get(selector.login_btn).click();
      cy.contains("Управление залами").should("be.visible");

      let movieTitle;

      cy.get(selector.movie_title)
        .eq(0)
        .invoke("text")
        .then((text) => {
          movieTitle = text;
          cy.visit("/");
          cy.get(selector.day).should("have.length", 7);
          cy.get(selector.third_day).click();
          cy.contains(new RegExp(movieTitle, "i")).should("be.visible");
          cy.get(selector.movie_selection).first().contains("11:00").click();
          numberOf.data.forEach((seat) => {
            cy.get(
              `.buying-scheme__wrapper > :nth-child(${seat.row}) > :nth-child(${seat.seat})`
            ).click();
          });
          cy.get(selector.accept_btn).click();
          cy.contains("Вы выбрали билеты:").should("be.visible");
          cy.get(selector.chairs_info)
            .invoke("text")
            .then((text) => {
              numberOf.data.forEach((seat) => {
                const seatText = `${seat.row}/${seat.seat}`;
                cy.wrap(text).should("contain", seatText);
              });
            });
        });
    });
  });
});