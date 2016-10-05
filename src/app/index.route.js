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
        url: '/patients',
        template: '<patients-component><patients-component>'
      })
      .state('patients-summary', {
        url: '/patients-summary',
        template: '<patients-summary-component><patients-summary-component>',
        params: {patientId: null, patientsList: null}
      })
      .state('patients-list-full', {
        url: '/patients-full-details?ageFrom&ageTo&orderType&pageNumber&reportType&searchString&queryType',
        template: '<patients-list-full-component><patients-list-full-component>'
      });
}

export default routeConfig;