import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useCookies } from "../hook/cookie";
import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export function withLang(
  Component: any,
  lang: { [key: string]: { [key: string]: string } },
) {
  const Lang = (props: any) => {
    const [langProp, setLangProp] = useState();
    const [language, _setLanguage] = useCookies("lang", "");
    const router = useRouter();

    // Refresh for SSR mode
    useEffect(() => {
      if (JSON.stringify(props.lang) != JSON.stringify(lang[language as any])) {
        router.replace(router.asPath);
      }
    }, [language, props.lang, router]);

    useEffect(() => {
      if (language !== "") {
        setLangProp(lang[language as any] as any);
      }

      if (!language) {
        setLangProp(process.env.DEFAULT_LANG as any);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang, langProp, props.lang]);

    if (props.lang) {
      return <Component {...props} />;
    }

    return <Component {...props} lang={langProp} />;
  };

  return Lang;
}

export function getLangServerSideProps(
  context: GetServerSidePropsContext,
  languages?: { en: any; id: any },
) {
  const lang = getCookie("lang", { req: context.req, res: context.res });

  let langData: Object | undefined;

  if (lang) {
    langData = (languages as any)[lang as any];
  } else {
    langData = (languages as any)[process.env.DEFAULT_LANG as any];
  }

  return {
    props: {
      lang: langData,
    },
  };
}

export function withLangSchema(
  schema: (msg?: any) => Yup.AnyObjectSchema,
  lang: { [key: string]: { [key: string]: string } },
) {
  const getLang = getCookie("lang");

  if (getLang) {
    return schema(lang[getLang as string]);
  }

  return schema(lang[process.env.DEFAULT_LANG as any]);
}
