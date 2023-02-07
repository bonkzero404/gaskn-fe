import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { useCookies } from "../../../../shared/hook/cookie";
import { MenuLangProps } from "./props";

export const MenuLang = (props: MenuLangProps) => {
  const [lang, setLang] = useCookies<string>(
    "lang",
    process.env.DEFAULT_LANG as any,
  );

  const [langState, setLangState] = useState<string>(
    process.env.DEFAULT_LANG as any,
  );
  const router = useRouter();

  useEffect(() => {
    if (langState !== lang) {
      setLangState(lang);
    }
  }, [lang, langState]);

  const handleLanguageChange = (lang: string, cb: any) => {
    setLangState(lang);
    setLang(lang);

    setTimeout(() => {
      router.replace(router.asPath);
      if (cb) cb(lang);
    });
  };

  return (
    <Suspense>
      <a
        className={`text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-100 cursor-pointer ${
          lang === "en" && "bg-gray-100"
        }`}
        onClick={() => handleLanguageChange("en", props.callbackAction)}
      >
        English (EN)
      </a>

      <a
        className={`text-sm py-2 px-4 font-normal block w-full whitespace-nowrap hover:bg-gray-100 cursor-pointer ${
          lang === "id" && "bg-gray-100"
        }`}
        onClick={() => handleLanguageChange("id", props.callbackAction)}
      >
        Indonesia (ID)
      </a>
    </Suspense>
  );
};
