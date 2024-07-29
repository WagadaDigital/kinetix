export const defaultOptions = {
  root: null,
  rootMargin: "0% 50%",
  threshold: 0.5,
  animateClassName: "animate",
  disabledClassName: "disabled",
  enterEventName: "in",
  exitEventName: "out",
  selector: "[data-animate]",
  once: true,
  disabled: false,
};

/**
 * Sets the options for the application.
 *
 * @param {Object} settings - The settings object.
 * @returns {Object} - The merged options object.
 */
export function setOptions(settings) {
  return { ...defaultOptions, ...settings };
}
