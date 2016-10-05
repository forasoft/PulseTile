//libs
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngRedux from 'ng-redux';
import dirPagination from 'angular-utils-pagination';
import createLogger from 'redux-logger';

//commons
import reducer from './redux/reducer';
import actions from './actions';
import httpMiddleware from './helpers/httpMiddleware';
import AdvancedSearch from './helpers/advancedSearch';
import Patient from './helpers/patient';

//components 
import HeaderComponent from './rippleui/header-bar/header.component.js';
import HomeComponent from './rippleui/pages/home/home.component.js';
import PatientsComponent from './rippleui/pages/patients-list/patients.component';
import PatientsSummaryComponent from './rippleui/pages/patient-summary/patients-summary.component';
import PatientsListFullComponent from './rippleui/pages/patients-list-full/patients-list-full.component';
import PatientsSidebarComponent from './rippleui/pages/patients-detail/patients-sidebar.component';
import PatientsBannerComponent from './rippleui/pages/patients-detail/patients-banner.component';

import ServiceRequests from './services/serviceRequests.js';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

const app = angular
    .module('app', [
        uiRouter,
        uiBootstrap,
        ngRedux,
        actions,
        dirPagination
    ])
    .factory('httpMiddleware', httpMiddleware)
    .factory('AdvancedSearch', AdvancedSearch)
    .factory('Patient', Patient)
    .service('serviceRequests', ServiceRequests)
    .component('patientsComponent', PatientsComponent)
    .component('headerComponent', HeaderComponent)
    .component('homeComponent', HomeComponent)
    .component('patientsSummaryComponent', PatientsSummaryComponent)
    .component('patientsSidebarComponent', PatientsSidebarComponent)
    .component('patientsBannerComponent', PatientsBannerComponent)
    .component('patientsListFullComponent', PatientsListFullComponent)
    .config(routeConfig)
    .config(function (paginationTemplateProvider) {
        paginationTemplateProvider.setString(require('./rippleui/pagination/dirPagination.tpl.html'));
    })
    .config(['$ngReduxProvider', $ngReduxProvider => {
        const middleware = ['httpMiddleware'];

        if (process.env.NODE_ENV === 'development') {
            middleware.push(createLogger({
                level: 'info',
                collapsed: true
            }));
        }

        $ngReduxProvider.createStoreWith(reducer, middleware);
    }])
    .filter('formatNHSNumber', function() {
        return function(number) {
            if (number === undefined) {
                return;
            }

            return number.slice(0,3) + " " + number.slice(3,6) + " " + number.slice(6);
        };
    });
console.log('app start');