import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function useRouterRefresh(props?: any): [() => void, boolean] {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { asPath } = router;

  useEffect(() => {
    setIsRefreshing(false);
  }, [props]);

  const cb = useCallback(() => {
    router.replace(asPath);
    setIsRefreshing(true);
  }, [router, asPath]);

  return [cb, isRefreshing];
}
