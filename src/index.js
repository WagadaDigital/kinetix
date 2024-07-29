import { setOptions, options } from "./config.js";
import { disable, enable, reset, update, isDisabled } from "./observer.js";

let elements = [];

const init = (settings = options) => {
  setOptions(settings);

  if (typeof window === "undefined") {
    return {
      elements,
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
    elements,
    disable,
    enable,
    reset,
    update,
  };
};

export default init;
