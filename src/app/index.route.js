routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider
      .state('main-search', {
        url: '/search',
        views: {
          main: {template: '<search-component><search-component>'}
        }
      })
      .state('patients-charts', {
        url: '/charts',
        views: {
          main: {template: '<patients-charts-component><patients-charts-component>'}
        }
      })
      .state('patients-list', {
        url: '/patients?ageRange&department&order&reverse',
        views: {
          main: {template: '<patients-component><patients-component>'}
        },
        params: { patientsList: [], advancedSearchParams: [], displayEmptyTable: false }
      })
      .state('patients-summary', {
        url: '/patients/{patientId:int}/patients-summary?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<patients-summary-component><patients-summary-component>'}
        },
        params: {patientId: null, patientsList: null }
      })
      .state('patients-list-full', {
        url: '/patients-full-details?ageFrom&ageTo&orderType&pageNumber&reportType&searchString&queryType',
        views: {
          main: {template: '<patients-list-full-component><patients-list-full-component>'}
        }        
      })
      .state('diagnoses-list', {
        url: '/patients/{patientId:int}/diagnoses?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<diagnoses-list-component></diagnoses-list-component>'}
        },
        params: {patientId: null, reportType: null}
      })
      .state('diagnoses-detail', {
        url: '/patients/{patientId:int}/diagnoses/{diagnosisIndex}?filter&page&reportType&searchString&queryType&source',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<diagnoses-list-component></diagnoses-list-component>'},
          detail: {template: '<diagnoses-detail-component></diagnoses-detail-component>'}
        },
        params: {patientId: null, reportType: null, diagnosisIndex: null}
      })
      .state('allergies', {
        url: '/patients/{patientId:int}/allergies?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<allergies-list-component></allergies-list-component>'}
        },
        params: {patientId: null, reportType: null}
      })
      .state('allergies-detail', {
        url: '/patients/{patientId:int}/allergies/{allergyIndex}?filter&page&reportType&searchString&queryType&source',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<allergies-list-component></allergies-list-component>'},
          detail: {template: '<allergies-detail-component></allergies-detail-component>'}
        },
        params: {patientId: null, reportType: null, allergyIndex: null}
      });
}

export default routeConfig;