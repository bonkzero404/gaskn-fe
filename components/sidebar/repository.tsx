import { BaseRepository } from "../../shared/base-repository";

export class Repository extends BaseRepository {
  public async getListMenu(token: string) {
    const res = await this.FetchGet("/api/v1/menu", undefined, token);
    return res?.json();
  }
}
