import { defaultOptions } from "./config.js";
import { dispatchEvent } from "./events.js";

export const clearAnimation = (element) => {
  element.classList.remove(defaultOptions.animateClassName);
  element.style.transitionDuration = null;
};

export const animate = (entry) => {
  const target = entry.target;
  const animationDuration =
    target.dataset.animationDuration || defaultOptions.animationDuration;
  target.classList.add(defaultOptions.animateClassName);
  dispatchEvent(defaultOptions.enterEventName, entry);

  if (animationDuration) {
    target.style.transitionDuration = `${animationDuration}ms`;
  }
};

export const reverse = (entry) => {
  clearAnimation(entry.target);
  dispatchEvent(defaultOptions.exitEventName, entry);
};

export const isAnimated = (element) =>
  element.classList.contains(defaultOptions.animateClassName);
