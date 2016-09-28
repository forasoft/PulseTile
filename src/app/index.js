import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngRedux from 'ng-redux';
import dirPagination from 'angular-utils-pagination';

import HeaderComponent from './rippleui/header-bar/header.component.js';
import HomeComponent from './rippleui/pages/home/home.component.js';
import PatientsComponent from './rippleui/pages/patients-list/patients.component';


import ServiceRequest from './services/serviceRequests.js';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

// angular.element(document).ready(() => {
//   angular.bootstrap(document, [app.name], {strictDi: true});
// });

const app = angular
    .module('app', [
        uiRouter,
        uiBootstrap,
        ngRedux,
        dirPagination
    ])
    // .factory('apiMiddleware', apiMiddleware)
    .service('serviceRequest', ServiceRequest)
    .component('patientsComponent', PatientsComponent)
    .component('headerComponent', HeaderComponent)
    .component('homeComponent', HomeComponent)
    .config(routeConfig)
    .config(function (paginationTemplateProvider) {
        paginationTemplateProvider.setString(require('./rippleui/pagination/dirPagination.tpl.html'));
    });
console.log('app start');