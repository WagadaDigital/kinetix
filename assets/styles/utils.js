/**
 * Adds a CSS class to an element.
 * @param {HTMLElement} element - The element to add the class to.
 * @param {string} className - The name of the class to add.
 */
export function addClass(element, className) {
  element.classList.add(className);
}

/**
 * Removes a class from an element.
 * @param {Element} element - The element from which to remove the class.
 * @param {string} className - The name of the class to remove.
 */
export function removeClass(element, className) {
  element.classList.remove(className);
}

/**
 * Dispatches a custom event with the given name and entry.
 * @param {string} name - The name of the custom event.
 * @param {any} entry - The entry to be passed as detail in the custom event.
 */
export function dispatchEvent(name, entry) {
  const event = new CustomEvent(name, { bubbles: true, detail: entry });
  entry.target.dispatchEvent(event);
}
