export let defaultOptions = {
  root: null,
  rootMargin: "0% 50%",
  threshold: 0.5,
  animateClassName: "data-animate",
  disabledClassName: "data-disabled",
  enterEventName: "animation:in",
  exitEventName: "animation:out",
  selector: "[data-animation]",
  once: false,
  disabled: false,
  animationDuration: 300,
};

export const setOptions = (settings) => {
  if (settings && settings !== defaultOptions) {
    defaultOptions = {
      ...defaultOptions,
      ...settings,
    };
  }
};
