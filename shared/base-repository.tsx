type ObjectOrArray = { [key: string]: any } | Array<{ [key: string]: any }>;

export class BaseRepository {
  private baseUrl = process.env.ENDPOINT_URI;

  public defaultOptions(
    options: RequestInit | undefined,
    token?: string | undefined,
  ) {
    if (token) {
      options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      options = {
        headers: { "Content-Type": "application/json" },
      };
    }

    return options;
  }

  private getLangUsage(): string | null {
    const isBrowser = typeof window === "undefined" ? false : true;

    if (isBrowser) {
      const getLang = localStorage.getItem("lang");
      return (getLang as string)?.replace(/"/g, "");
    }

    return null;
  }

  public async SetDataSend(
    path: string,
    method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" | undefined,
    bodyData?: ObjectOrArray | undefined,
    token?: string,
    options?: RequestInit | undefined,
  ): Promise<Response> {
    let opts: RequestInit = {};
    if (!options) {
      opts = this.defaultOptions(options, token);
    }

    if (bodyData) {
      opts.body = JSON.stringify(bodyData);
    }

    if (method) {
      opts.method = method;
    }

    const res = await fetch(
      `${this.baseUrl}${path}?lang=${this.getLangUsage()}`,
      opts,
    );
    return res;
  }

  public async FetchPost(
    path: string,
    data?: ObjectOrArray | undefined,
    token?: string,
    options?: RequestInit | undefined,
  ): Promise<Response> {
    return await this.SetDataSend(path, "POST", data, token, options);
  }

  public async FetchPut(
    path: string,
    data?: ObjectOrArray | undefined,
    token?: string,
    options?: RequestInit | undefined,
  ): Promise<Response | unknown> {
    return await this.SetDataSend(path, "PUT", data, token, options);
  }

  public async FetchDelete(
    path: string,
    data?: ObjectOrArray | undefined,
    token?: string,
    options?: RequestInit | undefined,
  ): Promise<Response | unknown> {
    return await this.SetDataSend(path, "DELETE", data, token, options);
  }

  public async FetchGet(
    path: string,
    data?: ObjectOrArray | undefined,
    token?: string,
    options?: RequestInit | undefined,
  ): Promise<Response | unknown> {
    return await this.SetDataSend(path, "GET", data, token, options);
  }
}
