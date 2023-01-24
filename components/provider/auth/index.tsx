import { useRouter } from "next/router";
import { BaseRepository } from "../../../shared/base-repository";
import moment from "moment";
import { AuthProviderProps } from "./props";
import { removeCookie, useCookies } from "../../../shared/hook/cookie";
import { useLocalStorage } from "usehooks-ts";
import useDidMountEffect from "../../../shared/hook/mount";
import AuthContext from "./context";

export const AuthProvider = (props: AuthProviderProps) => {
  const [sessionCookie, SetCookie] = useCookies<{
    expires?: number;
    token?: string;
  }>("auth", { expires: 0, token: "" });
  const router = useRouter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const repository = new BaseRepository();
  const [rememberForm, _setRememberForm] = useLocalStorage<{
    email?: string;
    password?: string;
    rememberme?: boolean;
  }>("remember-form-login", {});

  useDidMountEffect(() => {
    if (sessionCookie && sessionCookie?.token === "") {
      const match = router.pathname.match(props.protectedRoute);

      if (props.blockPageAfterAuthorize && match && match.length > 0) {
        const finder = props.blockPageAfterAuthorize.filter(
          (val) => val === match[0],
        );

        if (finder.length === 0) {
          router.replace(props.fallback);
          return;
        }
      }
    }

    if (router.pathname && sessionCookie && sessionCookie.token !== "") {
      const tokenExpires = moment.unix(sessionCookie.expires as number);
      const dateNow = moment().valueOf();
      const subtractExpires = moment
        .unix(sessionCookie.expires as number)
        .subtract(2, "minutes")
        .valueOf();

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

      if (dateNow >= tokenExpires.valueOf()) {
        if (rememberForm) {
          repository
            .FetchPost("/api/v1/auth", {
              email: rememberForm.email,
              password: rememberForm.password,
            })
            .then(async (response) => {
              const data = await response.json();

              if (data?.errors) {
                removeCookie("auth");
                router.replace(props.fallback);
                return;
              }

              SetCookie({
                token: data.data.token,
                expires: data.data.expires,
              });

              return;
            })
            .catch((_err) => {
              removeCookie("auth");
              router.replace(props.fallback);
            });
        } else {
          removeCookie("auth");
          router.replace(props.fallback);
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
            const data = await response.json();

            if (data?.errors) {
              removeCookie("auth");
              router.replace(props.fallback);
              return;
            }

            SetCookie({
              token: data.data.token,
              expires: data.data.expires,
            });

            return;
          })
          .catch((_err) => {
            removeCookie("auth");
            router.replace(props.fallback);
            return;
          });
      }
    }
  }, [props]);

  return (
    <AuthContext.Provider
      value={{ token: sessionCookie.token ? sessionCookie.token : "" }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
