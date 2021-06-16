import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUpdateEffect = (effect: () => void, deps: any[]) => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    if (effect) {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
