routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  console.log('routing test');
  $stateProvider
      .state('home', {
        url: '/',
        views: {
          main: { template: '<home-component><home-component>'}
        }
      })
      .state('patients-list', {
        url: '/patients-list',
        views: {
          main: {template: '<patients-component><patients-component>'}
        }        
      })
      .state('patients-summary', {
        url: '/patients/{patientId:int}/patients-summary?reportType&searchString&queryType',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<patients-summary-component><patients-summary-component>'}
        },
        params: {patientId: null, patientsList: null}
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
    });
}

export default routeConfig;