import { PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop(props: PropsWithChildren) {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <>{props.children}</>;
}

export default ScrollToTop;
