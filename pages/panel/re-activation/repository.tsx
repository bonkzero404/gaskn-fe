import { BaseRepository } from "../../../shared/base-repository";
export class Repository extends BaseRepository {
  public async reSendActivation(body: { email: string }) {
    const res = await this.FetchPost("/api/v1/user/activation/re-send", body);
    return res?.json();
  }
}
