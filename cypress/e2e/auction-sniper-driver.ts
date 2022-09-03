export class AuctionSniperDriver {
  constructor(timeoutMillis: number) {
    Cypress.config("defaultCommandTimeout", timeoutMillis);
    cy.visit("http://localhost:3000");
  }

  public showSniperStatus(statusText: string) {
    cy.get("#sniper-status").contains(statusText);
  }
}
