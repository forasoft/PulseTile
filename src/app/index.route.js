routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/search');
  console.log('routing test');
  $stateProvider
      .state('main-search', {
        url: '/search',
        template: '<search-component><search-component>'
      })
      .state('patients-charts', {
        url: '/charts',
        template: '<patients-charts-component><patients-charts-component>'
      })
      .state('patients-list', {
        url: '/patients',
        template: '<patients-component><patients-component>'
      })
      .state('patients-summary', {
        url: '/patients-summary',
        template: '<patients-summary-component><patients-summary-component>',
        params: {patientId: null, patientsList: null}
      });
}

export default routeConfig;