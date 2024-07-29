import { defaultOptions, setOptions } from "./config.js";
import { animate, reverse } from "./animation-control.js";

const SSR_MESSAGE = "Sal was not initialised! Probably it is used in SSR.";

const NOT_SUPPORTED_MESSAGE =
  "" +
  "Your browser does not support IntersectionObserver!\n" +
  "Get a polyfill from here:\n" +
  "https://github.com/w3c/IntersectionObserver/tree/master/polyfill";

/**
 * Private
 */
let elements = [];
let intersectionObserver = null;

/**
 * Clears animation for given element.
 * @param {HTMLElement} element
 */
const clearAnimation = (element) => {
  element.classList.remove(defaultOptions.animateClassName);
};

/**
 * Checks if element was animated.
 * @param {HTMLElement} element
 */
const isAnimated = (element) =>
  element.classList.contains(defaultOptions.animateClassName);

/**
 * Enables animations by remove class from body.
 */
const enableAnimations = () => {
  document.body.classList.remove(defaultOptions.disabledClassName);
};

/**
 * Disables animations by add class from body.
 */
const disableAnimations = () => {
  document.body.classList.add(defaultOptions.disabledClassName);
};

/**
 * Clears observer.
 */
const clearObserver = () => {
  intersectionObserver.disconnect();
  intersectionObserver = null;
};

/**
 * Check if should be disabled.
 * @return {Boolean}
 */
const isDisabled = () =>
  defaultOptions.disabled ||
  (typeof defaultOptions.disabled === "function" && defaultOptions.disabled());

/**
 * IntersectionObserver callback.
 * @param  {Array<IntersectionObserverEntry>} entries
 * @param  {IntersectionObserver} observer
 */
const onIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    const { target } = entry;
    const hasRepeatFlag = target.dataset.salRepeat !== undefined;
    const hasOnceFlag = target.dataset.salOnce !== undefined;
    const shouldRepeat = hasRepeatFlag || !(hasOnceFlag || defaultOptions.once);

    if (entry.intersectionRatio >= defaultOptions.threshold) {
      animate(entry, defaultOptions);

      if (!shouldRepeat) {
        observer.unobserve(target);
      }
    } else if (shouldRepeat) {
      reverse(entry, defaultOptions);
    }
  });
};

/**
 * Returns collection of elements and pushes them to observer.
 *
 * @returns {Array<Node>}
 */
const getObservedElements = () => {
  const collection = [].filter.call(
    document.querySelectorAll(defaultOptions.selector),
    (element) => !isAnimated(element, defaultOptions.animateClassName)
  );

  collection.forEach((element) => intersectionObserver.observe(element));

  return collection;
};

/**
 * Disables instance by removing animations and clearing observer.
 */
const disable = () => {
  disableAnimations();
  clearObserver();
};

/**
 * Enables instance by launching new IntersectionObserver.
 */
const enable = () => {
  enableAnimations();

  intersectionObserver = new IntersectionObserver(onIntersection, {
    root: defaultOptions.root,
    rootMargin: defaultOptions.rootMargin,
    threshold: defaultOptions.threshold,
  });

  elements = getObservedElements();
};

/**
 * Resets instance to provide new settings.
 * @param {Object} settings
 */
const reset = (settings = {}) => {
  clearObserver();

  Array.from(document.querySelectorAll(options.selector)).forEach(
    clearAnimation
  );

  setOptions(settings);
  enable();
};

/**
 * Updates observer with new elements to animated.
 * Useful for dynamically injected elements.
 */
const update = () => {
  const newElements = getObservedElements();
  elements.push(newElements);
};

/**
 * Init
 * @param  {Object} settings
 * @return {Object} public API
 */
const init = (settings = options) => {
  setOptions(settings);

  // Early return, when window object is not defined
  // e.g. during Server Side Rendering
  if (typeof window === "undefined") {
    // eslint-disable-next-line no-console
    console.warn(SSR_MESSAGE);

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

    throw Error(NOT_SUPPORTED_MESSAGE);
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
