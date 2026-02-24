## Code Standards

### Code Style

Some developers feel the need to debate code style. Other engineers will use the project's style and get stuff done. We prefer engineers who get stuff done. Consistency is important, please follow these guidelines.

We use the [JavaScript Standard Style](https://standardjs.com/) in our code. This is the style used by npm, GitHub, Zeit, MongoDB, Express, Electron, and many others. Be sure to use an automatic formatter like [standard-formatter](https://atom.io/packages/standard-formatter) for Atom and [vscode-standardjs](https://marketplace.visualstudio.com/items/chenxsan.vscode-standardjs) for Visual Studio Code.

Line length should be limited to 80 characters.

### Code Principles

* Code should be as simple, explicit, and as easy to understand as possible.
* Functional style is preferred to OOP. When possible functions should be pure and not rely on shared state or side effects.
* Avoid large frameworks; use small modules that are easy to understand.
* Modules must use this order so that they can be understood quickly when skimmed:
  1. External dependencies: anything listed in `package.json`, e.g. `require('http')`
  2. Internal dependencies: any files created in the project itself, e.g. `require('./api')`
  3. Constants and other setup: this includes anything *absolutely necessary* to be defined before `module.exports`
  4. Exports: `module.exports` should be as close to the beginning of the file as possible. The module should export either a single function or a "catalog object", e.g. `module.exports = { method1, method2, ... }`
  5. Functions: these go after the above sections. Use function hoisting to control the placement of your functions so that important, high-level functions are above smaller more-general utility functions.

* Keep your functions short. If your function is over 40 lines, you should have a good reason.

* Functions should not accept more than 3 arguments. Use a single options object if you need more arguments.

* Keep nesting to a minimum. Use [early returns](https://blog.timoxley.com/post/47041269194/avoid-else-return-early), single-line conditionals, and function calls.

### Naming Convention

* Use descriptive variable names. Function names should be a verb like route() or verb combined with a noun like routeRequest().
* Use meaningful descriptive names, e.g `getUserPosts` instead of `getUserData`.
* Favor descriptive over concise names, e.g `findUserById` instead of `findUser`.
* Use consistent names per concept. In a project, function names should be like `getUsers`, `getQuestions` and `getCourses` instead of `getUsers`, `retrieveQuestions` and `returnCourses`.
* Variable names should be self-descriptive, it shouldn't need a comment for additional documentation.
* Booleans should have a prefix like is, has, or are to help engineers with identifying booleans easier, e.g `isVisible` instead of `visible`.