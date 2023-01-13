import { BaseRepository } from "../../../shared/base-repository";
export class Repository extends BaseRepository {
  public async activation(body: { email: string; code: string }) {
    const res = await this.FetchPost("/api/v1/user/activation", body);
    return res?.json();
  }
}
