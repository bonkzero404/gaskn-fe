import "../styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { AuthProvider } from "../components/provider/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <AuthProvider
        protectedRoute="\/panel[?/](.*)"
        fallback="/panel/signin"
        redirectSuccess="/panel/dashboard"
        blockPageAfterAuthorize={[
          "/panel/signin",
          "/panel/forgot-password",
          "/panel/register",
          "/panel/activation",
          "/panel/re-activation",
        ]}
      >
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
