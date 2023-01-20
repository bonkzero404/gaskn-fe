import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { Dispatch, SetStateAction, useCallback } from "react";

import { useEventCallback } from "usehooks-ts";

type SetCookie<T> = Dispatch<SetStateAction<T>>;

export function useCookies<T>(key: string, initialValue: T): [T, SetCookie<T>] {
  const readValue = useCallback((): T => {
    try {
      const item = getCookie(key);
      return item
        ? ((isJsonString(item as string)
            ? parseJSON(item as string)
            : item) as T)
        : initialValue;
    } catch (error) {
      console.warn(`Error reading cookie key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const setValue: SetCookie<T> = useEventCallback((value) => {
    setCookie(key, value);
  });

  return [readValue(), setValue];
}

export const removeCookie = (key: string, options?: OptionsType) =>
  deleteCookie(key, options);

function isJsonString(str: string) {
  try {
    return JSON.parse(str) && !!str;
  } catch (e) {
    return false;
  }
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.error("parsing error on", { value });
    return undefined;
  }
}
