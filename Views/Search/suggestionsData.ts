// import { EpodroznikSDK } from "epodroznik-sdk";

export interface StationData {
  id: number;
  name: string;
  region: string;
}

abstract class SuggestionsBase {
  private readonly baseUrl = "https://trave-api.herokuapp.com/api/v1/";
  protected async request(
    endpoint: string,
    params:
      | { query: string; type?: "source" | "destination" }
      | { id: string; type?: "source" | "destination" }
  ) {
    const req = await fetch(
      `${this.baseUrl}${endpoint}?${new URLSearchParams(params)}`
    );
    try {
      return await req.json();
    } catch {
      return [];
    }
  }
}

export class TrainSuggestions extends SuggestionsBase {
  public async getSearchResults(query: string) {
    return await this.request("train/search", { query });
  }
  public async getHistoryItemById(id: number) {
    return await this.request("train/station", { id: id.toString() });
  }
}

export class BusSuggestions extends SuggestionsBase {
  public async getSearchResults(query: string, type: "SOURCE" | "DESTINATION") {
    return await this.request("bus/search", {
      query,
      type: type.toLowerCase() as any,
    });
  }
  public async getHistoryItemById(id: number, type: "SOURCE" | "DESTINATION") {
    return await this.request("bus/station", {
      id: id.toString(),
      type: type.toLowerCase() as any,
    });
  }
}
