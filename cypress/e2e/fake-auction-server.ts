import { reject } from "cypress/types/bluebird";
import { resolve } from "path";

class FakeRedisPubSub {
  private static instance: FakeRedisPubSub;

  private subscribes: {
    [channel: string]: ((message: string, channel: string) => void)[];
  };
  private constructor() {
    this.subscribes = {};
  }

  public static getInstance() {
    if (!FakeRedisPubSub.instance)
      FakeRedisPubSub.instance = new FakeRedisPubSub();
    return FakeRedisPubSub.instance;
  }

  public subscribe(
    channel: string,
    callback: (message: string, channel: string) => void
  ) {
    if (!this.subscribes[channel]) this.subscribes[channel] = [];
    this.subscribes[channel].push(callback);
  }

  public publish(channel: string, message: string) {
    this.subscribes[channel]?.forEach((item) => item(message, channel));
  }

  public close(channel: string) {
    this.publish(channel, "close");
    delete this.subscribes[channel];
  }

  public quit() {
    this.subscribes = {};
  }

  get subscribeCount() {
    return Object.keys(this.subscribes).length;
  }
}

export class FakeAuctionServer {
  public itemId: string;

  private redisClient;

  constructor(itemId: string) {
    this.redisClient = FakeRedisPubSub.getInstance();

    this.itemId = itemId;
  }

  public startSellingItem() {
    //SKip. 할수있는게 없다
    this.redisClient.subscribe(this.topic, (message, channel) => {});
  }

  get topic() {
    return `auction-${this.itemId}`;
  }

  public hasReceivedJoinRequestFromSniper() {
    return new Promise((resolve, reject) => {
      if (this.redisClient.subscribeCount == 0) {
        reject(Error("Join Request Not Received"));
      } else resolve("");
    });
  }

  public announceClosed() {
    this.redisClient.publish(this.topic, "close");
  }
}
