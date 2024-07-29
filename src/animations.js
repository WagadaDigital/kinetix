import { defaultOptions } from "./config.js";
import { dispatchEvent } from "./events.js";

export const clearAnimation = (element) => {
  element.classList.remove(defaultOptions.animateClassName);
};

export const animate = (entry) => {
  entry.target.classList.add(defaultOptions.animateClassName);
  dispatchEvent(defaultOptions.enterEventName, entry);
};

export const reverse = (entry) => {
  clearAnimation(entry.target);
  dispatchEvent(defaultOptions.exitEventName, entry);
};

export const isAnimated = (element) =>
  element.classList.contains(defaultOptions.animateClassName);
