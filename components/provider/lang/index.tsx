import { useEffect } from "react";
import { useCookies } from "../../../shared/hook/cookie";
import { LangProps } from "./props";

export const LangProvider = (props: LangProps) => {
  const [lang, setLang] = useCookies("lang", "");
  useEffect(() => {
    if (lang == "") {
      setLang(process.env.DEFAULT_LANG as string);
    }
  }, [lang, setLang]);
  return <>{props.children}</>;
};
