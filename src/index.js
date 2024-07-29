import "./index.css";

import { setOptions, defaultOptions } from "./config.js";
import { disable, enable, reset, update, isDisabled } from "./observer.js";

const init = (settings = defaultOptions) => {
  setOptions(settings);

  if (typeof window === "undefined") {
    return {
      disable,
      enable,
      reset,
      update,
    };
  }

  if (!window.IntersectionObserver) {
    disableAnimations();
  }

  if (!isDisabled()) {
    enable();
  } else {
    disableAnimations();
  }

  return {
    disable,
    enable,
    reset,
    update,
  };
};

export default init;
