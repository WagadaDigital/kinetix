let options = {
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

let elements = [];
let intersectionObserver = null;

const setOptions = (settings) => {
  if (settings && settings !== options) {
    options = {
      ...options,
      ...settings,
    };
  }
};

const clearAnimation = (element) => {
  element.classList.remove(options.animateClassName);
};

const fireEvent = (name, entry) => {
  const event = new CustomEvent(name, {
    bubbles: true,
    detail: entry,
  });

  entry.target.dispatchEvent(event);
};

const animate = (entry) => {
  entry.target.classList.add(options.animateClassName);
  fireEvent(options.enterEventName, entry);
};

const reverse = (entry) => {
  clearAnimation(entry.target);
  fireEvent(options.exitEventName, entry);
};

const isAnimated = (element) =>
  element.classList.contains(options.animateClassName);

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

const isDisabled = () =>
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

const getObservedElements = () => {
  const collection = [].filter.call(
    document.querySelectorAll(options.selector),
    (element) => !isAnimated(element, options.animateClassName)
  );

  collection.forEach((element) => intersectionObserver.observe(element));

  return collection;
};

const disable = () => {
  disableAnimations();
  clearObserver();
};

const enable = () => {
  enableAnimations();

  intersectionObserver = new IntersectionObserver(onIntersection, {
    root: options.root,
    rootMargin: options.rootMargin,
    threshold: options.threshold,
  });

  elements = getObservedElements();
};

const reset = (settings = {}) => {
  clearObserver();

  Array.from(document.querySelectorAll(options.selector)).forEach(
    clearAnimation
  );

  setOptions(settings);
  enable();
};

const update = () => {
  const newElements = getObservedElements();
  elements.push(newElements);
};

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
