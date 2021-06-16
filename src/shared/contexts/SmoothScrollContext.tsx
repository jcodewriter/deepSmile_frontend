import React, { createContext, useEffect, useState } from "react";
export interface LocomotiveScrollOptions {
  el?: Element;
  elMobile?: Element;
  name?: string;
  offset?: number;
  repeat?: boolean;
  smooth?: boolean;
  smoothMobile?: boolean;
  direction?: string;
  inertia?: number;
  class?: string;
  scrollbarClass?: string;
  scrollingClass?: string;
  draggingClass?: string;
  smoothClass?: string;
  initClass?: string;
  getSpeed?: boolean;
  getDirection?: boolean;

  init(): void;
  setScrollLimit(): void;
  startScrolling(): void;
  stopScrolling(): void;
  checkKey(e: KeyboardEvent): void;
  checkScroll(): void;
  checkResize(): void;
  updateDelta(e: WheelEvent): void;
  updateScroll(e: Event): void;
  addDirection(): void;
  addSpeed(): void;
  initScrollBar(): void;
  reinitScrollBar(): void;
  destroyScrollBar(): void;
  getScrollBar(e: Event): void;
  releaseScrollBar(e: Event): void;
  moveScrollBar(e: MouseEvent): void;
  addElements(): void;
  addSections(): void;
  transform(element: Element, x: number, y: number, delay: number): void;
  transformElement(isForced: boolean): void;
  scrollTo(targetOption: string | Event, offsetOption: number): void;
  update(): void;
  startScroll(): void;
  stopScroll(): void;
  setScroll(x: number, y: number): void;
  destroy(): void;
}

export interface SmoothScrollProviderProps {
  children?: React.ReactNode;
  options: LocomotiveScrollOptions;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SmoothScrollContext = createContext<any>({ scroll: null });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SmoothScrollProvider = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [scroll, setScroll] = useState<any>(null);
  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          const LocomotiveScroll = (await import("locomotive-scroll" as string)).default;

          setScroll(
            new LocomotiveScroll({
              el: document.querySelector("[data-scroll-container]") ?? undefined,
              ...props.options,
            })
          );
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`);
        }
      })();
    }

    return () => {
      if (scroll) scroll.destroy();
    };
  }, [scroll]);

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>{props.children}</SmoothScrollContext.Provider>
  );
};

SmoothScrollContext.displayName = "SmoothScrollContext";
SmoothScrollProvider.displayName = "SmoothScrollProvider";
