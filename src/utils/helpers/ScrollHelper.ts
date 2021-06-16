import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export default class ScrollHelper {
  static disableScroll = (targetElement: HTMLElement) => {
    disableBodyScroll(targetElement);
  };

  static enableScroll = (targetElement: HTMLElement) => {
    enableBodyScroll(targetElement);
  };

  static resetDisabledScroll = () => {
    clearAllBodyScrollLocks();
  };
}
