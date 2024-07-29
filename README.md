# Kinetix

A modular and extensible scroll animation library. This library provides an easy way to add animations to elements when they come into view.

## Basic Usage

First, include the library in your project and initialize it with the desired settings:

```JavaScript
import ScrollAnimationLibrary from 'scroll-animation-library';

const options = {
  root: null,
  rootMargin: '0% 50%',
  threshold: 0.5,
  animateClassName: 'animate',
  disabledClassName: 'disabled',
  enterEventName: 'in',
  exitEventName: 'out',
  selector: '[data-animate]',
  once: true,
  disabled: false,
};

ScrollAnimationLibrary.init(options);
```

## HTML Markup

Add the data-animate attribute to the elements you want to animate:

```html
<div data-animate>Animate me!</div>
<div data-animate>Animate me too!</div>
```

## Custom Animations

Define your custom animation in CSS

```css
.animate {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.5s ease-out,
    transform 0.5s ease-out;
}

[data-animate] {
  opacity: 0;
  transform: translateY(20px);
}
```

## Dynamic Elements

If you dynamically add elements to the DOM, call the update method to observe the new elements:

```JavaScript
ScrollAnimationLibrary.update();
```

## API

`init(settings)`

Initializes the library with the provided settings.

Parameters:

    settings (Object): Configuration options for the library.

Returns:

    An object with methods to control the library (enable, disable, reset, update).

`enable()`

Enables animations by launching a new IntersectionObserver.

`disable()`

Disables animations and clears the IntersectionObserver.

`reset(newSettings)`

Resets the library with new settings.

Parameters:

    newSettings (Object): New configuration options.

`update()`

Updates the observer with new elements to animate. Useful for dynamically injected elements.

## Options

- `root (Element | null):` The element that is used as the viewport for checking visibility of the target. Defaults to the browser viewport if not specified.
- `rootMargin (String):` Margin around the root. Can have values similar to the CSS margin property.
- `threshold (Number):` A threshold of 0.5 means that when 50% of the target is visible within the root, the callback is invoked.
- `animateClassName (String):` The class name to be added for the animation.
- `disabledClassName (String):` The class name to be added to the body when animations are disabled.
- `enterEventName (String):` The custom event name dispatched when the element enters the viewport.
- `exitEventName (String):` The custom event name dispatched when the element exits the viewport.
- `selector (String):` The CSS selector for the elements to animate.
- `once (Boolean):` If true, the animation will only happen once.
  disabled (Boolean | Function): If true, disables the animations. Can also be a function that returns a boolean.
