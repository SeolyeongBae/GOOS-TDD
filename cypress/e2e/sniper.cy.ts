import { AuctionSniperDriver } from "./auction-sniper-driver";
import { FakeAuctionServer } from "./fake-auction-server";

class ApplicationRunner {
  private driver: AuctionSniperDriver;

  constructor() {
    this.driver = new AuctionSniperDriver(1000);
  }

  public showsSniperHasLostAuction() {
    this.driver?.showSniperStatus("lost"); //ES6 symbol
  }

  public startSellingItem(auction: any) {
    this.driver?.showSniperStatus("joining");
  }
}

describe("Auction Sniper e2e test", () => {
  let auction: FakeAuctionServer;
  let application: ApplicationRunner;

  before(() => {
    auction = new FakeAuctionServer("item-54321");
    application = new ApplicationRunner();
  });

  it("sniper joins auction until auction closes", () => {
    auction.startSellingItem();
    application.startSellingItem(auction);
    auction.hasReceivedJoinRequestFromSniper();
    auction.announceClosed();
    // application.showsSniperHasLostAuction();
  });
});
