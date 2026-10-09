import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Treat every route as a fresh page: reset the scroll position whenever
 * navigation changes and let the browser paint the new page from the top.
 */
export default function RouteChange() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
