import { Dispatch, SetStateAction, useCallback } from "react";
import useLocalStorage from "./localstorage";
import { useEventCallback, useEventListener } from "usehooks-ts";

type sessionState = {
  token: string;
  expires: number;
};

type SetSessionToken<T> = Dispatch<SetStateAction<T>>;

export function useShouldSetSession<T>(): [sessionState, SetSessionToken<T>] {
  const [token, setToken] = useLocalStorage<sessionState>("auth-token", {
    token: "",
    expires: 0,
  });

  const session = useCallback((): sessionState => {
    return token;
  }, [token]);

  const setSession: SetSessionToken<T> = useEventCallback((value) => {
    setToken(value as any);
  });

  return [session(), setSession];
}
