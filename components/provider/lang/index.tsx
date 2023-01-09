import { useEffect } from "react";
import useLocalStorage from "../../../shared/hook/localstorage";
import { LangProps } from "./props";

export const LangProvider = (props: LangProps) => {
  const [lang, setLang] = useLocalStorage("lang", "");
  useEffect(() => {
    if (lang == "") {
      setLang(process.env.DEFAULT_LANG as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);
  return <>{props.children}</>;
};
