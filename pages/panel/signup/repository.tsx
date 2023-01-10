import { BaseRepository } from "../../../shared/base-repository";
export class Repository extends BaseRepository {
  public async register(body: { email: string; password: string }) {
    const res = await this.FetchPost("/api/v1/user/register", body);
    return res?.json();
  }
}
