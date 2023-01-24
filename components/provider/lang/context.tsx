import { createContext } from "react";

export interface LangContextType {
  lang: string;
}

const LangContext = createContext<LangContextType>({
  lang: process.env.DEFAULT_LANG ? process.env.DEFAULT_LANG : "en",
});

export default LangContext;
