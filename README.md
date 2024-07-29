# Kinetix

A simple and modular scroll animation library

## Pseudocode

### Step 1: Utility Functions

Create utility functions for common tasks (e.g., class manipulation, event dispatching).

```JavaScript
// Utils.js
export function addClass(element, className) {
  element.classList.add(className);
}

export function removeClass(element, className) {
  element.classList.remove(className);
}

export function dispatchEvent(name, entry) {
  const event = new CustomEvent(name, { bubbles: true, detail: entry });
  entry.target.dispatchEvent(event);
}
```

### Step 2: Intersection Observer Manager

Create a module to handle the IntersectionObserver logic.

```JavaScript
// Observer.js
let observer = null;

export function createObserver(callback, options) {
  if (!window.IntersectionObserver) {
    throw new Error('IntersectionObserver is not supported');
  }
  observer = new IntersectionObserver(callback, options);
  return observer;
}

export function observeElements(elements) {
  elements.forEach(element => observer.observe(element));
}

export function disconnectObserver() {
  if (observer) {
    observer.disconnect();
  }
}
```

### Step 3: Animation Control

Create modules for enabling, disabling, and controlling animations.

```JavaScript
// AnimationControl.js
import { addClass, removeClass, dispatchEvent } from './Utils.js';

export function animate(entry, options) {
  addClass(entry.target, options.animateClassName);
  dispatchEvent(options.enterEventName, entry);
}

export function reverse(entry, options) {
  removeClass(entry.target, options.animateClassName);
  dispatchEvent(options.exitEventName, entry);
}

export function clearAnimation(element, options) {
  removeClass(element, options.animateClassName);
}
```

### Step 4: Main Library Initialization

Create the main module to initialize and control the library.

```JavaScript
// ScrollAnimationLibrary.js
import { defaultOptions, setOptions } from './Config.js';
import { addClass, removeClass } from './Utils.js';
import { createObserver, observeElements, disconnectObserver } from './Observer.js';
import { animate, reverse, clearAnimation } from './AnimationControl.js';

let options = defaultOptions;
let elements = [];

function onIntersection(entries, observer) {
  entries.forEach(entry => {
    const shouldRepeat = entry.target.dataset.repeat !== undefined || !(entry.target.dataset.once !== undefined || options.once);
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

  if (typeof window === 'undefined') {
    console.warn('Library is used in SSR.');
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
  elements.forEach(element => clearAnimation(element, options));
  options = setOptions(newSettings);
  enable();
}

function update() {
  const newElements = Array.from(document.querySelectorAll(options.selector)).filter(element => !element.classList.contains(options.animateClassName));
  elements.push(...newElements);
  observeElements(newElements);
}

export default { init, enable, disable, reset, update };
```
