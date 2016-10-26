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

To run tests, type `npm test` or `karma start` in the terminal.


#### General Plugin overview
Plugins are extentions to currenly built 'core' (with general modules, that can not be removed) application. They expand the functionality of the application, add necessary features and are used to expand the application for users to fit their needs.   


#### Installation of the new Plugins to the application:  

1. Run the following command within your command line: npm/bower install moduleName (Module name here stands for github url for external plugin)  
*We are downloading the module from external repository*

2. To copy files from node_modules/bower_components use: webpack.config.js --> CopyWebpackPlugin, change path in it's options { from: '', to: '' }  
*Here we are copying module files from source folder to destination folder*

3. npm run copy  
*Running the copy command itself*  

4. Add module-actions.js to src/app/actions/index.js  
*here we are adding the module's actions, which are added to use them within redux architecture. The action import should look like this: http://prntscr.com/cyrh7t;

5. Add module-reducer-name.js to src/app/redux/reducer.js  
*reducer.js is redux-related file, where we add the module to redux architecture. In general, the module addition within the named file looks like this: http://prntscr.com/cyrg2z;*

6. Add actions types from module/constants/ActionTypes.js to src/app/constants/ActionTypes.js    
*The constants file contains global constants to use within an application, in general the addition to already existing 'core' constant file looks like this: http://prntscr.com/cyr9dx* 

7. Add components to src/app/index.js and src/app/index.route.js  
*To add functionality also the index.js and index.route.js files should be updated also. Within the index.js the component addition in general looks like this: http://prnt.sc/cyrb1a, where PatientBannerComponent is basically the AngularJS view name, and /rippleosi/pages/patient-details/ is the path to necessary for plugin files (listing and functionality of files for an example module are listed below);  
index.route.js is used for routing, so the application will know where to look for plugin's pages. For example, this is general view of a single plugin's code for route file: http://prntscr.com/cyrdcb, where:  
url: basically what user sees in his URL bar when he clicks on related module;  
views: list of components that will be displayed on the page after clicking on the module itself;*


#### Explanations about module functionality files, that should be developed:  
1. example-actions.js   
*This file contains actions functions for redux architecture*

2. example-reducer-name.js  
*It contains reducer functions for redux architecture*

3. example-list.component.js   
*It's list.component functionality file (angular 1.5 component)*

4. example-list.html  
*HTML template file for list.component*

5. example-detail.component.js  
*It's detail.component functionality file (angular 1.5 component)*

6. example-detail.html   
*HTML Template file for detail.component*

7. example-modal.js   
*It's modal functionality file (should be added to plugin if the modal window is necessary)*

8. example-modal.html  
*HTML Template file for modal window (should be added to plugin if the modal window is necessary)*

9. ActionTypes.js   
*This file contains actions constants for redux architecture*
