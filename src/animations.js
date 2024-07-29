import { defaultOptions } from "./config.js";
import { dispatchEvent } from "./events.js";

export const clearAnimation = (element) => {
  element.classList.remove(defaultOptions.animateClassName);
  element.style.transitionDuration = null;
};

export const animate = (entry) => {
  const target = entry.target;
  const duration = target.dataset.animationDuration || defaultOptions.duration;
  target.classList.add(defaultOptions.animateClassName);
  dispatchEvent(defaultOptions.enterEventName, entry);

  if (duration) {
    target.style.transitionDuration = `${duration}ms`;
  }
};

export const reverse = (entry) => {
  clearAnimation(entry.target);
  dispatchEvent(defaultOptions.exitEventName, entry);
};

export const isAnimated = (element) =>
  element.classList.contains(defaultOptions.animateClassName);
