Ripple IDCR UI
=========

This repository contains the code base for the Ripple Angular UI, which is a separate package that sits on top of
 the Ripple Java Middleware (Org-Ripple-Core).
Note that our application sits on top of Angular 1.5 and [Redux](https://github.com/reactjs/redux), it gives funny journey while you go through development.

 # Table of Contents
 * [Requirements](#requirements)
 * [Installation](#installation)
 * [Running the App](#running-the-application)
     * [NPM Scripts](#npm-scripts)
     * [Testing](#testing)
 * [Development](#development)
     * [Build System](#build-system)
     * [File Structure](#file-structure)
     * [Testing Setup](#testing-setup)
     * [Generating Components](#generating-components)

### Requirements

To develop and run the application locally you must have the following installed:
* NodeJS
* A running version of The Ripple Middleware listening on port 19191


### Installation

Install the JavaScript package manager NodeJS v6:
https://nodejs.org/download/

* `npm install` to install dependencies
* `bower install` to install dependencies

### Running the Application

Org-Ripple-UI uses Webpack to build and launch the development environment. After you have installed all dependencies, you may run the app. Running `npm start` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.

Just simply run `npm start` - this will also watch changes.

#### NPM Scripts
Here's a list of available scripts:
* `npm run build`
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `npm start`
  * starts a dev server via `webpack-dev-server`, serving the client folder with watching source file change.
* `npm run lint`
  * lint codebase using [Eslint](http://eslint.org/)
* `npm run scaffold`
  * ignore this - not prepared, just reserved for future purpose scaffolds a new Angular component. [Read below](#generating-components) for usage details.

#### Testing
To run the tests, run `npm test` or `karma start`.
For now testing is not supported yet. Will be added in future

`Karma` combined with Webpack runs all files matching `*.spec.js` inside the `app` folder. This allows us to keep test files local to the component--which keeps us in good faith with continuing to build our app modularly. The file `spec.bundle.js` is the bundle file for **all** our spec files that Karma will run.

Be sure to define your `*.spec.js` files within their corresponding component directory. You must name the spec file like so, `[name].spec.js`. If you don't want to use the `.spec.js` suffix, you must change the `regex` in `spec.bundle.js` to look for whatever file(s) you want.
`Mocha` is the testing suite and `Chai` is the assertion library. If you would like to change this, see `karma.conf.js`.

### Development
#### Build System
Org-Ripple-UI uses Webpack together for its build system.

`Webpack` handles all file-related concerns:
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well

#### File Structure
We use a john papa's modularized approach with ES6. This will be the eventual standard (and particularly helpful, if using Angular's new router) as well as a great way to ensure a tasteful transition to Angular 2, when the time is ripe. Everything--or mostly everything, as we'll explore (below)--is a component. A component is a self-contained concern--may it be a feature or strictly-defined, ever-present element of the UI (such as a header, sidebar, or footer). Also characteristic of a component is that it harnesses its own stylesheets, templates, controllers, routes, services, and specs. This encapsulation allows us the comfort of isolation and structural locality. Here's how it looks:
```
src
⋅⋅app/
⋅⋅⋅⋅index.js * app entry file
⋅⋅⋅⋅index.route.js * define app routing rules
⋅⋅⋅⋅rippleui/ * where application ui lives
⋅⋅⋅⋅⋅⋅home/ * home component
⋅⋅⋅⋅⋅⋅⋅⋅home.component.js * home "directive"
⋅⋅⋅⋅⋅⋅⋅⋅home.controller.js * home controller
⋅⋅⋅⋅⋅⋅⋅⋅home.styl * home styles
⋅⋅⋅⋅⋅⋅⋅⋅home.html * home template
```

#### Testing Setup
All tests are also written in ES6. We use Webpack to take care of the logistics of getting those files to run in the various browsers, just like with our client files. This is our testing stack:
* Karma
* Webpack + Babel
* Mocha
* Chai

To run tests, type `npm test` or `karma start` in the terminal. Read more about testing [below](#testing).

#### Installation of the new module (functionality) to the application:
1. npm/bower install moduleName (github url)
2. To copy files from node_modules/bower_components use: webpack.config.js --> CopyWebpackPlugin change path in options { from: '', to: '' }
3. npm run copy
4. add module-actions.js to src/app/actions/index.js
5. add module-reducer-**.js to src/app/redux/reducer.js
6. add actions types from module/constants/ActionTypes.js to src/app/constants/ActionTypes.js
7. add components to src/app/index.js and src/app/index.route.js

#### Explanations about module functionality
1. example-actions.js - It contains actions functions for redux architecture
2. example-reducer-**.js - It contains reducer functions for redux architecture
3. example-list.component.js - It's list.component functionality file (angular 1.5 component)
4. example-list.html - template for list.component
5. example-detail.component.js - It's detail.component functionality file (angular 1.5 component)
6. example-detail.html - template for detail.component
7. example-modal.js - It's modal functionality file
8. example-modal.html - template for modal
9. ActionTypes.js - It contains actions constants for redux architecture
