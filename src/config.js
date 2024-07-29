export let defaultOptions = {
  root: null,
  rootMargin: "0% 50%",
  threshold: 0.5,
  animateClassName: "data-animate",
  disabledClassName: "data-disabled",
  enterEventName: "sal:in",
  exitEventName: "sal:out",
  selector: "[data-animation]",
  once: true,
  disabled: false,
};

export const setOptions = (settings) => {
  if (settings && settings !== defaultOptions) {
    defaultOptions = {
      ...defaultOptions,
      ...settings,
    };
  }
};
