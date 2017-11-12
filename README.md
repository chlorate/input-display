Input Display
=============

A customizable, web-based controller input display.

Available at: https://chlorate.ca/input-display/

Features
--------

* Controller compatibility:
  * Mostly depends on your browser ([see wiki](https://github.com/chlorate/input-display/wiki/Compatibility))
  * Uses the [Gamepad API](https://www.w3.org/TR/gamepad/)
  * Can read d-pad inputs from buttons, a single axis, or X and Y axes
  * Axes can optionally be inverted
* Tracks controller statistics:
  * Total number of presses for each button
  * Current mash speed for each button
  * Best mash speed for each button
  * Axis neutral, minimum, and maximum values (for calibration)
  * Persists between browser sessions using `localStorage`
* Configuration
  * Can be loaded from or saved to JSON files
  * Persists between browser sessions using `localStorage`
* Design customizations:
  * Font: name, size, bold, italic, drop shadow
  * Background color
  * Buttons: palettes for pressed or unpressed, mashing or non-mashing states
  * Axes: palettes for neutral and moved states
  * Border, fill, and label colors can be changed for each state
* Controls:
  * Any number of button or analog stick controls can be added
  * All controls can be resized
  * All controls can have a border of any width
  * Controls can be moved using drag-and-drop or arrow keys
  * Controls can be cloned
  * Controls can be moved up or down to change z-index order
  * Mapping:
    * All controls can be mapped to any controller button
    * Analog sticks can be mapped to any X and Y axes
  * Button shapes:
    * Circle or ellipse
    * Square or rectangle
    * Triangle: 8 directions
    * D-pad: 4 directions
  * Analog stick shapes:
    * Circle
    * Octagon
  * Labels:
    * Name, number of presses, and mash speed can optionally be shown for any control
    * Labels can be centered in the middle of the control or around it
    * Mash speed label can replace name or press count labels when shown
    * Mash speed label is shown when mash speed exceeds some threshold
  * Rounded corners:
    * Set top and bottom corner radius of square and rectangle shapes
    * Set corner radius of d-pad shapes
  * Ellipse, square, and rectangle shapes can be rotated
  * Outer and inner shapes of analog sticks can be resized separately
* Custom CSS can be used for additional customization

Development
-----------

* [Bootstrap v4](https://getbootstrap.com)
* [TypeScript](https://www.typescriptlang.org)
* [Inferno](https://infernojs.org)
* [MobX](https://mobx.js.org)
* [webpack](https://webpack.js.org)

### Getting started

The following tools must be installed on your system:

* make
* Node.js

Run `make watch` to install all dependencies and start the development server.

### Release checklist

* Update version in `package.json` and `src/version.ts`.
* Update `CHANGELOG.md`.
* Create `vX.Y.Z` tag.
