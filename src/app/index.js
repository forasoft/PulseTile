//libs
import uiRouter from 'angular-ui-router';
import 'angular-ui-calendar';
import ngAnimate from 'angular-animate';
import uiBootstrap from 'angular-ui-bootstrap';
import ngRedux from 'ng-redux';
import dirPagination from 'angular-utils-pagination';
import createLogger from 'redux-logger';
import 'angular-loading-bar';
import 'fullcalendar';
import 'angular-ui-calendar';
import 'jquery';
import 'morrisjs';
import 'angular-spinner';

//commons
import reducer from './redux/reducer';
import actions from './actions';
import httpMiddleware from './helpers/httpMiddleware';
import AdvancedSearch from './helpers/advancedSearch';
import Patient from './helpers/patient';
import DiagnosesModal from './rippleui/pages/diagnoses/diagnoses-modal';
import AllergiesModal from './rippleui/pages/allergies/allergies-modal';
import MedicationsModal from './rippleui/pages/medications/medications-modal';
import ContactsModal from './rippleui/pages/contacts/contacts-modal';
import OrdersModal from './rippleui/pages/orders/orders-modal';
import ReferralsModal from './rippleui/pages/referrals/referrals-modal';
import AppointmentsModal from './rippleui/pages/appointments/appointments-modal';
import AppointmentConfirmModal from './rippleui/pages/appointments/appointments-confirm-modal';
import ProceduresModal from './rippleui/pages/procedures/procedures-modal';
import ClinicalnotesModal from './rippleui/pages/clinical-notes/clinicalnotes-modal';
import HeightAndWeightModal from './rippleui/pages/height-and-weight/heightAndWeight-modal';
import GenericMdtModal from './rippleui/pages/generic-mdt/generic-mdt-modal';

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
import MedicationsListComponent from './rippleui/pages/medications/medications-list.component';
import MedicationsDetailComponent from './rippleui/pages/medications/medications-detail.component';
import ContactsListComponent from './rippleui/pages/contacts/contacts-list.component';
import ContactsDetailComponent from './rippleui/pages/contacts/contacts-detail.component';
import OrdersListComponent from './rippleui/pages/orders/orders-list.component';
import OrdersDetailComponent from './rippleui/pages/orders/orders-detail.component';
import ReferralsListComponent from './rippleui/pages/referrals/referrals-list.component';
import ReferralsDetailComponent from './rippleui/pages/referrals/referrals-detail.component';
import ProceduresListComponent from './rippleui/pages/procedures/procedures-list.component';
import ProceduresDetailComponent from './rippleui/pages/procedures/procedures-detail.component';
import ResultsListComponent from './rippleui/pages/results/results-list.component';
import ResultsDetailComponent from './rippleui/pages/results/results-detail.component';
import DocumentsListComponent from './rippleui/pages/documents/documents-list.component';
import DocumentsDetailComponent from './rippleui/pages/documents/documents-detail.component';
import ClinicalnotesListComponent from './rippleui/pages/clinical-notes/clinicalnotes-list.component';
import ClinicalnotesDetailComponent from './rippleui/pages/clinical-notes/clinicalnotes-detail.component';
import AppointmentsListComponent from './rippleui/pages/appointments/appointments-list.component';
import AppointmentsDetailComponent from './rippleui/pages/appointments/appointments-detail.component';
import HeightAndWeightListComponent from './rippleui/pages/height-and-weight/heightAndWeight-list.component';
import HeightAndWeightDetailComponent from './rippleui/pages/height-and-weight/heightAndWeight-detail.component';
import GenericMdtListComponent from './rippleui/pages/generic-mdt/generic-mdt-list.component';
import GenericMdtDetailComponent from './rippleui/pages/generic-mdt/generic-mdt-detail.component';
import MainComponent from './helpers/main.component';

import ServiceRequests from './services/serviceRequests.js';

import routeConfig from 'app/index.route';
import 'app/scss/core.scss';

const app = angular
    .module('app', [
        uiRouter,
        ngAnimate,
        uiBootstrap,
        ngRedux,
        actions,
        dirPagination,
        'angularSpinner',
        'ui.calendar',
        'angular-loading-bar'
    ])
    .factory('httpMiddleware', httpMiddleware)
    .factory('AdvancedSearch', AdvancedSearch)
    .factory('DiagnosesModal', DiagnosesModal)
    .factory('AllergiesModal', AllergiesModal)
    .factory('MedicationsModal', MedicationsModal)
    .factory('ContactsModal', ContactsModal)
    .factory('OrdersModal', OrdersModal)
    .factory('ReferralsModal', ReferralsModal)
    .factory('ProceduresModal', ProceduresModal)
    .factory('AppointmentsModal', AppointmentsModal)
    .factory('AppointmentConfirmModal', AppointmentConfirmModal)
    .factory('ClinicalnotesModal', ClinicalnotesModal)
    .factory('HeightAndWeightModal', HeightAndWeightModal)
    .factory('GenericMdtModal', GenericMdtModal)
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
    .component('medicationsListComponent', MedicationsListComponent)
    .component('medicationsDetailComponent', MedicationsDetailComponent)
    .component('contactsListComponent', ContactsListComponent)
    .component('contactsDetailComponent', ContactsDetailComponent)
    .component('ordersListComponent', OrdersListComponent)
    .component('ordersDetailComponent', OrdersDetailComponent)
    .component('referralsListComponent', ReferralsListComponent)
    .component('referralsDetailComponent', ReferralsDetailComponent)
    .component('proceduresListComponent', ProceduresListComponent)
    .component('proceduresDetailComponent', ProceduresDetailComponent)
    .component('patientsListFullComponent', PatientsListFullComponent)
    .component('resultsListComponent', ResultsListComponent)
    .component('resultsDetailComponent', ResultsDetailComponent)
    .component('documentsListComponent', DocumentsListComponent)
    .component('documentsDetailComponent', DocumentsDetailComponent)
    .component('appointmentsListComponent', AppointmentsListComponent)
    .component('appointmentsDetailComponent', AppointmentsDetailComponent)
    .component('clinicalnotesListComponent', ClinicalnotesListComponent)
    .component('clinicalnotesDetailComponent', ClinicalnotesDetailComponent)
    .component('heightAndWeightListComponent', HeightAndWeightListComponent)
    .component('heightAndWeightDetailComponent', HeightAndWeightDetailComponent)
    .component('genericMdtListComponent', GenericMdtListComponent)
    .component('genericMdtDetailComponent', GenericMdtDetailComponent)
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
    .directive('focusElement', function($timeout) {
      return {
        link: function(scope, element, attrs) {
          scope.$watch(attrs.focusElement, function(value) {
            $timeout(function() {
              if(value === true) {
                jQuery(element).focus();
              }
            });
          });
        }
      }
    })
    .filter('formatNHSNumber', function() {
        return function(number) {
            if (number === undefined) {
                return;
            }

            return number.slice(0,3) + " " + number.slice(3,6) + " " + number.slice(6);
        };
    })
    .filter('formatMoment', function() {
        return function(date) {
            var m = moment(date);
            return m.format('h:mma');
        };
    });
console.log('app start');