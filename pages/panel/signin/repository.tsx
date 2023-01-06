import { BaseRepository } from "../../../shared/base-repository";
export class Repository extends BaseRepository {
  public async authenticate(body: { email: string; password: string }) {
    const res = await this.FetchPost("/api/v1/auth", body);
    return res?.json();
  }
}
