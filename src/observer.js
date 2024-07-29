import { options, setOptions } from "./config.js";
import { animate, reverse, isAnimated, clearAnimation } from "./animations.js";

let elements = [];
let intersectionObserver = null;

const enableAnimations = () => {
  document.body.classList.remove(options.disabledClassName);
};

const disableAnimations = () => {
  document.body.classList.add(options.disabledClassName);
};

const clearObserver = () => {
  intersectionObserver.disconnect();
  intersectionObserver = null;
};

export const isDisabled = () =>
  options.disabled ||
  (typeof options.disabled === "function" && options.disabled());

const onIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    const { target } = entry;
    const hasRepeatFlag = target.dataset.salRepeat !== undefined;
    const hasOnceFlag = target.dataset.salOnce !== undefined;
    const shouldRepeat = hasRepeatFlag || !(hasOnceFlag || options.once);

    if (entry.intersectionRatio >= options.threshold) {
      animate(entry);

      if (!shouldRepeat) {
        observer.unobserve(target);
      }
    } else if (shouldRepeat) {
      reverse(entry);
    }
  });
};

export const getObservedElements = () => {
  const collection = [].filter.call(
    document.querySelectorAll(options.selector),
    (element) => !isAnimated(element, options.animateClassName)
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
    root: options.root,
    rootMargin: options.rootMargin,
    threshold: options.threshold,
  });

  elements = getObservedElements();
};

export const reset = (settings = {}) => {
  clearObserver();

  Array.from(document.querySelectorAll(options.selector)).forEach(
    clearAnimation
  );

  setOptions(settings);
  enable();
};

export const update = () => {
  const newElements = getObservedElements();
  elements.push(newElements);
};
