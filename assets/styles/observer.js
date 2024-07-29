let observer = null;

/**
 * Creates an IntersectionObserver instance.
 *
 * @param {IntersectionObserverCallback} callback - The function to be called whenever the target intersects with the root.
 * @param {IntersectionObserverInit} options - The options to configure the IntersectionObserver.
 * @returns {IntersectionObserver} The created IntersectionObserver instance.
 * @throws {Error} If IntersectionObserver is not supported by the browser.
 */
export function createObserver(callback, options) {
  if (!window.IntersectionObserver) {
    throw new Error("IntersectionObserver is not supported");
  }
  observer = new IntersectionObserver(callback, options);
  return observer;
}

/**
 * Observes an array of elements using the Intersection Observer API.
 *
 * @param {Array<HTMLElement>} elements - The elements to observe.
 */
export function observeElements(elements) {
  elements.forEach((element) => observer.observe(element));
}

/**
 * Disconnects the observer if it exists.
 */
export function disconnectObserver() {
  if (observer) {
    observer.disconnect();
  }
}
