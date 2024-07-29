import { addClass, removeClass, dispatchEvent } from "./utils.js";

/**
 * Animates an entry using the specified options.
 *
 * @param {Object} entry - The entry to animate.
 * @param {Object} options - The animation options.
 * @param {string} options.animateClassName - The class name to add for animation.
 * @param {string} options.enterEventName - The name of the enter event to dispatch.
 */
export function animate(entry, options) {
  addClass(entry.target, options.animateClassName);
  dispatchEvent(options.enterEventName, entry);
}

/**
 * Reverses the animation by removing the animateClassName from the target element
 * and dispatches the exitEventName.
 *
 * @param {Object} entry - The animation entry object.
 * @param {Object} options - The animation options.
 */
export function reverse(entry, options) {
  removeClass(entry.target, options.animateClassName);
  dispatchEvent(options.exitEventName, entry);
}

/**
 * Clears the animation by removing the specified class from the element.
 *
 * @param {HTMLElement} element - The element to clear the animation from.
 * @param {Object} options - The options for clearing the animation.
 * @param {string} options.animateClassName - The class name to remove from the element.
 */
export function clearAnimation(element, options) {
  removeClass(element, options.animateClassName);
}
