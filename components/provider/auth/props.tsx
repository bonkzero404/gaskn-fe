import { Url } from "url";

export interface AuthProviderProps {
  protectedRoute: string;
  fallback: Url | string;
  redirectSuccess: Url | string;
  blockPageAfterAuthorize?: Array<Url | string> | undefined;
  children?: JSX.Element;
}
