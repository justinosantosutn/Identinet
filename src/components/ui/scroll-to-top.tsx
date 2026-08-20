import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/** On a fresh navigation (not back/forward): scrolls to the element named by
 * the URL hash if there is one — e.g. a "Volver" link going to
 * "/#explora" from a sub-page — otherwise scrolls to top. Going back/forward
 * is left alone entirely so the browser's own scroll restoration (which
 * remembers where you actually were) can do its job instead of always
 * dropping you at the top. */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;

    if (hash) {
      const id = hash.slice(1);
      // The target section may not be in the DOM yet on the very first
      // paint after a route change, so retry for a few frames instead of
      // giving up after one missed lookup.
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
        } else if (attempts < 20) {
          attempts += 1;
          requestAnimationFrame(tryScroll);
        }
      };
      tryScroll();
      return;
    }

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash]);

  return null;
};
