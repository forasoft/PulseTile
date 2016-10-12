//libs
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import ngRedux from 'ng-redux';
import dirPagination from 'angular-utils-pagination';
import createLogger from 'redux-logger';
import 'angular-loading-bar';

//commons
import reducer from './redux/reducer';
import actions from './actions';
import httpMiddleware from './helpers/httpMiddleware';
import AdvancedSearch from './helpers/advancedSearch';
import Patient from './helpers/patient';
import DiagnosesModal from './rippleui/pages/diagnoses/diagnoses-modal';
import AllergiesModal from './rippleui/pages/allergies/allergies-modal';

//components 
import HeaderComponent from './rippleui/header-bar/header.component.js';
import PatientsChartsComponent from './rippleui/pages/patients-charts/patients-charts.component';
import PatientsComponent from './rippleui/pages/patients-list/patients.component';
import PatientsSummaryComponent from './rippleui/pages/patient-summary/patients-summary.component';
import PatientsListFullComponent from './rippleui/pages/patients-list-full/patients-list-full.component';
import PatientsSidebarComponent from './rippleui/pages/patients-detail/patients-sidebar.component';
import PatientsBannerComponent from './rippleui/pages/patients-detail/patients-banner.component';
import SearchComponent from './rippleui/search/search.component';
import ReportChartComponent from './rippleui/search/report-chart.component';
import DiagnosesListComponent from './rippleui/pages/diagnoses/diagnosis-list.component';
import DiagnosesDetailComponent from './rippleui/pages/diagnoses/diagnoses-detail.component';
import AllergiesListComponent from './rippleui/pages/allergies/allergies-list.component';
import AllergiesDetailComponent from './rippleui/pages/allergies/allergies-detail.component';
import MainComponent from './helpers/main.component';

import ServiceRequests from './services/serviceRequests.js';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

const app = angular
    .module('app', [
        uiRouter,
        uiBootstrap,
        ngRedux,
        actions,
        dirPagination,
        'angular-loading-bar'
    ])
    .factory('httpMiddleware', httpMiddleware)
    .factory('AdvancedSearch', AdvancedSearch)
    .factory('DiagnosesModal', DiagnosesModal)
    .factory('AllergiesModal', AllergiesModal)
    .factory('Patient', Patient)
    .service('serviceRequests', ServiceRequests)
    .component('patientsComponent', PatientsComponent)
    .component('headerComponent', HeaderComponent)
    .component('patientsChartsComponent', PatientsChartsComponent)
    .component('patientsSummaryComponent', PatientsSummaryComponent)
    .component('patientsSidebarComponent', PatientsSidebarComponent)
    .component('patientsBannerComponent', PatientsBannerComponent)
    .component('diagnosesListComponent', DiagnosesListComponent)
    .component('diagnosesDetailComponent', DiagnosesDetailComponent)
    .component('allergiesListComponent', AllergiesListComponent)
    .component('allergiesDetailComponent', AllergiesDetailComponent)
    .component('patientsListFullComponent', PatientsListFullComponent)
    .component('mainComponent', MainComponent)
    .component('searchComponent', SearchComponent)
    .component('reportChartComponent', ReportChartComponent)
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
    .config(['cfpLoadingBarProvider', cfpLoadingBarProvider => {
        cfpLoadingBarProvider.includeSpinner = false;
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