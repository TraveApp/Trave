import Fuse from "fuse.js";
import { stations } from "./mockData";
import { EpodroznikSDK } from "epodroznik-sdk";

export interface StationData {
  id: number;
  name: string;
  region: string;
}

export class TrainSuggestions {
  private readonly fuse;
  constructor() {
    this.fuse = new Fuse(stations as Array<StationData>, {
      includeScore: false,
      keys: ["name"],
    });
  }
  public async getSearchResults(query: string) {
    return this.fuse.search(query).map((item) => item.item);
  }
  public async getHistoryItemById(id: number) {
    return stations.find((station: any) => station.id === id);
  }
}

export class BusSuggestions {
  private readonly client;
  constructor() {
    this.client = new EpodroznikSDK();
  }
  public async getSearchResults(query: string, type: "SOURCE" | "DESTINATION") {
    try {
      const stationsFromEp = (
        await this.client.getSuggestions(query, ["STOPS"], type)
      ).matches;
      return stationsFromEp.map((station) => ({
        id: station.dbId,
        name: station.name,
        region: station.city,
      })) as Array<StationData>;
    } catch (e: any) {
      console.log(e.message);
      return [];
    }
  }
  public async getHistoryItemById(id: number, type: "SOURCE" | "DESTINATION") {
    // TODO: Implement this!!!
    return {
      id: Math.random() * 1000000,
      name: "TODO",
      region: "TODO",
    } as StationData;
  }
}
