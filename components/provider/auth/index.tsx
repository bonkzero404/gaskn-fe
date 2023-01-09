import { useRouter } from "next/router";
import { useEffect } from "react";
import { BaseRepository } from "../../../shared/base-repository";
import { useShouldSetSession } from "../../../shared/hook/auth";
import moment from "moment";
import { AuthProviderProps } from "./props";

export const AuthProvider = (props: AuthProviderProps) => {
  const [sessionToken, SetSessionToken] = useShouldSetSession();
  const router = useRouter();
  const repository = new BaseRepository();

  useEffect(() => {
    if (sessionToken && sessionToken.token === "") {
      const match = router.pathname.match(props.protectedRoute);

      if (match !== null) {
        router.replace(props.fallback);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken]);

  useEffect(() => {
    if (sessionToken && sessionToken.token !== "") {
      const tokenExpires = moment.unix(sessionToken.expires);
      const dateNow = moment().valueOf();
      const subtractExpires = tokenExpires.subtract(1, "minutes").valueOf();

      if (dateNow <= subtractExpires) {
        if (
          props.blockPageAfterAuthorize &&
          props.blockPageAfterAuthorize.length > 0
        ) {
          for (let url of props.blockPageAfterAuthorize) {
            if (router.pathname === url) {
              router.replace(props.redirectSuccess);
            }
          }
        }
      }

      if (dateNow > subtractExpires && dateNow < tokenExpires.valueOf()) {
        repository
          .FetchGet("/api/v1/auth/refresh-token", undefined, sessionToken.token)
          .then(async (response) => {
            const data = await (response as any).json();

            if (data?.errors) {
              return router.replace(props.fallback);
            }

            SetSessionToken({
              token: data.token,
              expires: data.expires,
            });
          });
      }

      if (dateNow >= tokenExpires.valueOf()) {
        router.replace(props.fallback);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionToken.token]);

  return <>{props.children}</>;
};
