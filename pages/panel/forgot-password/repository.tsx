import { BaseRepository } from "../../../shared/base-repository";
export class Repository extends BaseRepository {
  public async requestForgotPassword(body: { email: string }) {
    const res = await this.FetchPost(
      "/api/v1/user/request-forgot-password",
      body,
    );
    return res?.json();
  }
}
