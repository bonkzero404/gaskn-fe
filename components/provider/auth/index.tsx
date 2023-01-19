import { useRouter } from "next/router";
import { useEffect } from "react";
import { BaseRepository } from "../../../shared/base-repository";
import moment from "moment";
import { AuthProviderProps } from "./props";
import { useCookies } from "../../../shared/hook/cookie";

export const AuthProvider = (props: AuthProviderProps) => {
  const [sessionCookie, SetCookie] = useCookies<{
    expires?: number;
    token?: string;
  }>("auth", { expires: 0, token: "" });
  const router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const repository = new BaseRepository();

  useEffect(() => {
    if (sessionCookie && sessionCookie?.token === "") {
      const match = router.pathname.match(props.protectedRoute);

      if (props.blockPageAfterAuthorize && match && match.length > 0) {
        const finder = props.blockPageAfterAuthorize.filter(
          (val) => val === match[0],
        );

        if (finder.length === 0) {
          router.replace(props.fallback);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionCookie]);

  useEffect(() => {
    if (sessionCookie && sessionCookie.token !== "") {
      const tokenExpires = moment.unix(sessionCookie.expires as number);
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
          .FetchGet(
            "/api/v1/auth/refresh-token",
            undefined,
            sessionCookie.token,
          )
          .then(async (response) => {
            const data = await (response as any).json();

            if (data?.errors) {
              return router.replace(props.fallback);
            }

            SetCookie({
              token: data.token,
              expires: data.expires,
            });
          });
      }

      if (dateNow >= tokenExpires.valueOf()) {
        router.replace(props.fallback);
      }
    }
  }, [props, router.pathname, router, repository, sessionCookie, SetCookie]);

  return <>{props.children}</>;
};
