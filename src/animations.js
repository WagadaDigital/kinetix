import { options } from "./config.js";
import { fireEvent } from "./events.js";

export const clearAnimation = (element) => {
  element.classList.remove(options.animateClassName);
};

export const animate = (entry) => {
  entry.target.classList.add(options.animateClassName);
  fireEvent(options.enterEventName, entry);
};

export const reverse = (entry) => {
  clearAnimation(entry.target);
  fireEvent(options.exitEventName, entry);
};

export const isAnimated = (element) =>
  element.classList.contains(options.animateClassName);
