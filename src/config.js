export const defaultOptions = {
  root: null,
  rootMargin: "0% 50%",
  threshold: 0.5,
  animateClassName: "sal-animate",
  disabledClassName: "sal-disabled",
  enterEventName: "sal:in",
  exitEventName: "sal:out",
  selector: "[data-sal]",
  once: false,
  disabled: false,
};

/**
 * Sets the options for the application.
 *
 * @param {Object} settings - The settings object.
 * @returns {Object} - The merged options object.
 */
export const setOptions = (settings) => {
  return { ...defaultOptions, ...settings };
};
