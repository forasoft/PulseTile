import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngRedux from 'ng-redux';

import HeaderComponent from './rippleui/header-bar/header.component.js';
import HomeComponent from './rippleui/pages/home/home.component.js';

import ServiceRequest from './services/serviceRequests.js';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

const app = angular
  .module('app', [
    uiRouter,
    uiBootstrap,
    ngRedux
  ])
    // .factory('apiMiddleware', apiMiddleware)
    .service('serviceRequest', ServiceRequest)
    .config(routeConfig)
    .component('headerComponent', HeaderComponent)
    .component('homeComponent', HomeComponent);

angular.element(document).ready(() => {
  angular.bootstrap(document, [app.name], {strictDi: true});
});
console.log('app start');