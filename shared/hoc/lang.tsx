import { useEffect, useState } from "react";
import useLocalStorage from "../hook/localstorage";

export function withLang(
  Component: any,
  lang: { [key: string]: { [key: string]: string } },
) {
  const Lang = (props: any) => {
    const [langProp, setLangProp] = useState();
    const [language, _setLanguage] = useLocalStorage("lang", "");

    useEffect(() => {
      if (language !== "") {
        setLangProp(lang[language as any] as any);
      }

      if (!language) {
        setLangProp(process.env.DEFAULT_LANG as any);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, langProp]);

    return <Component {...props} lang={langProp} />;
  };

  return Lang;
}
