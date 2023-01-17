import { BaseRepository } from "../../../shared/base-repository";
export class Repository extends BaseRepository {
  public async createNewPassword(body: {
    email: string;
    code: string;
    password: string;
    repeat_password: string;
  }) {
    const res = await this.FetchPost("/api/v1/user/forgot-password", body);
    return res?.json();
  }
}
