import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "../../shared/hook/cookie";

const langList = [
  {
    lang: "English",
    val: "en",
  },
  {
    lang: "Indonesia",
    val: "id",
  },
];

export const Lang = () => {
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

  const handleLanguageChange = (lang: string) => {
    setLangState(lang);
    setLang(lang);
    setTimeout(() => {
      router.replace(router.asPath);
    });
  };

  return (
    <ul className="flex justify-center">
      {langList.map((item, index) => (
        <li key={index} className="mr-6 mb-10">
          {langState == item.val ? (
            <a>{item.lang}</a>
          ) : (
            <a
              className="text-blue-500 hover:text-blue-800 cursor-pointer"
              onClick={() => handleLanguageChange(item.val)}
            >
              {item.lang}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};
