import { defaultOptions, setOptions } from "./config.js";
import { animate, reverse, isAnimated, clearAnimation } from "./animations.js";

const thresholdArray = (steps) =>
  Array(steps + 1)
    .fill(0)
    .map((_, index) => index / steps || 0);

let previousY = 0;
let previousRatio = 0;

let elements = [];
let intersectionObserver = null;

const enableAnimations = () => {
  document.body.classList.remove(defaultOptions.disabledClassName);
};

const disableAnimations = () => {
  document.body.classList.add(defaultOptions.disabledClassName);
};

const clearObserver = () => {
  intersectionObserver.disconnect();
  intersectionObserver = null;
};

const observeEntries = (entry) => {
  console.log(entry.boundingClientRect.height);
  if (entry.boundingClientRect.top < window.innerHeight / 2) {
    entry.target.classList.add("position-top");
    entry.target.classList.remove("position-bottom");
  } else if (entry.boundingClientRect.bottom >= window.innerHeight / 2) {
    entry.target.classList.add("position-bottom");
    entry.target.classList.remove("position-top");
  }
};

/**
 * Checks if the observer is disabled based on the default options.
 *
 * @returns {boolean} Returns true if the observer is disabled, false otherwise.
 */
export const isDisabled = () =>
  defaultOptions.disabled ||
  (typeof defaultOptions.disabled === "function" && defaultOptions.disabled());

/**
 * Handles the intersection callback for the Intersection Observer.
 *
 * @param {IntersectionObserverEntry[]} entries - The array of intersection entries.
 * @param {IntersectionObserver} observer - The Intersection Observer instance.
 */
const onIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    const { target } = entry;
    const hasRepeatFlag = target.dataset.animationRepeat !== undefined;
    const hasOnceFlag = target.dataset.animationOnce !== undefined;
    const shouldRepeat = hasRepeatFlag || !(hasOnceFlag || defaultOptions.once);

    const currentY = entry.boundingClientRect.y;
    const currentRatio = entry.intersectionRatio;
    const isIntersecting = entry.isIntersecting;

    // observeEntries(entry);

    if (currentY < previousY) {
      if (currentRatio > previousRatio && isIntersecting) {
        console.log("Scrolling down enter");
      } else {
        console.log("Scrolling down leave");
      }
    } else if (currentY > previousY && isIntersecting) {
      if (currentRatio < previousRatio) {
        console.log("Scrolling up leave");
      } else {
        console.log("Scrolling up enter");
      }
    }

    previousY = currentY;
    previousRatio = currentRatio;

    if (entry.intersectionRatio >= defaultOptions.threshold) {
      animate(entry);

      if (!shouldRepeat) {
        observer.unobserve(target);
      }
    } else if (shouldRepeat) {
      reverse(entry);
    }
  });
};

/**
 * Retrieves the observed elements based on the default options.
 * @returns {Array<HTMLElement>} The collection of observed elements.
 */
export const getObservedElements = () => {
  const collection = [].filter.call(
    document.querySelectorAll(defaultOptions.selector),
    (element) => !isAnimated(element, defaultOptions.animateClassName)
  );

  collection.forEach((element) => intersectionObserver.observe(element));

  return collection;
};

export const disable = () => {
  disableAnimations();
  clearObserver();
};

export const enable = () => {
  enableAnimations();

  intersectionObserver = new IntersectionObserver(onIntersection, {
    root: defaultOptions.root,
    rootMargin: defaultOptions.rootMargin,
    threshold: defaultOptions.threshold,
  });

  elements = getObservedElements();
};

export const reset = (settings = {}) => {
  clearObserver();

  Array.from(document.querySelectorAll(defaultOptions.selector)).forEach(
    clearAnimation
  );

  setOptions(settings);
  enable();
};

export const update = () => {
  const newElements = getObservedElements();
  elements.push(newElements);
};
