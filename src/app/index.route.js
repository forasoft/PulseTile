routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  console.log('routing test');
  $stateProvider
      .state('home', {
        url: '/',
        template: '<home-component><home-component>'
      })
      .state('patients-list', {
          url: '/patients-list',
          template: '<patients-component><patients-component>'
      })
      .state('patients-summary', {
        url: '/patients-summary',
        template: '<patients-summary-component><patients-summary-component>',
        params: {patientId: null, patientsList: null}
      });
}

export default routeConfig;