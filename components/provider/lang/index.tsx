import { useEffect } from "react";
import { useCookies } from "../../../shared/hook/cookie";
import LangContext from "./context";
import { LangProps } from "./props";

export const LangProvider = (props: LangProps) => {
  const [lang, setLang] = useCookies("lang", "");
  useEffect(() => {
    if (lang == "") {
      setLang(process.env.DEFAULT_LANG as string);
    }
  }, [lang, setLang]);
  return (
    <LangContext.Provider value={{ lang }}>
      {props.children}
    </LangContext.Provider>
  );
};
