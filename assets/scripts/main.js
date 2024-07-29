import "../styles/main.css";

// ScrollAnimationLibrary.js
import { defaultOptions, setOptions } from "./config.js";
import { addClass, removeClass } from "./utils.js";
import {
  createObserver,
  observeElements,
  disconnectObserver,
} from "./observer.js";
import { animate, reverse, clearAnimation } from "./animation-control.js";

let options = defaultOptions;
let elements = [];

function onIntersection(entries, observer) {
  entries.forEach((entry) => {
    const shouldRepeat =
      entry.target.dataset.repeat !== undefined ||
      !(entry.target.dataset.once !== undefined || options.once);
    if (entry.intersectionRatio >= options.threshold) {
      animate(entry, options);
      if (!shouldRepeat) {
        observer.unobserve(entry.target);
      }
    } else if (shouldRepeat) {
      reverse(entry, options);
    }
  });
}

function init(settings) {
  options = setOptions(settings);

  if (typeof window === "undefined") {
    console.warn("Library is used in SSR.");
    return { elements, disable, enable, reset, update };
  }

  if (!options.disabled) {
    enable();
  } else {
    addClass(document.body, options.disabledClassName);
  }

  return { elements, disable, enable, reset, update };
}

function enable() {
  removeClass(document.body, options.disabledClassName);
  const observer = createObserver(onIntersection, options);
  elements = Array.from(document.querySelectorAll(options.selector));
  observeElements(elements);
}

function disable() {
  addClass(document.body, options.disabledClassName);
  disconnectObserver();
}

function reset(newSettings = {}) {
  disconnectObserver();
  elements.forEach((element) => clearAnimation(element, options));
  options = setOptions(newSettings);
  enable();
}

function update() {
  const newElements = Array.from(
    document.querySelectorAll(options.selector)
  ).filter((element) => !element.classList.contains(options.animateClassName));
  elements.push(...newElements);
  observeElements(newElements);
}

export default { init, enable, disable, reset, update };
