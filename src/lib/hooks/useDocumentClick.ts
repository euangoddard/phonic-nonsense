import { useEffect } from "preact/compat";
import { MutableRef } from "preact/hooks";

export const useDocumentClick = (
  callback: VoidFunction,
  excludedRef?: MutableRef<HTMLElement | null>
): void => {
  useEffect(() => {
    document.addEventListener("click", callback, false);
    const touchListener = (event: TouchEvent) => {
      event.preventDefault();
      if (excludedRef?.current && excludedRef.current === event.target) {
        return;
      }
      callback();
    };
    document.addEventListener("touchstart", touchListener, { passive: false });
    return () => {
      document.removeEventListener("click", callback, false);
      document.removeEventListener("touchstart", touchListener);
    };
  });
};
