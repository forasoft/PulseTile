routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  console.log('routing test');
  $stateProvider
      .state('home', {
        url: '/',
        views: {
          main: { 
            template: '<home-component><home-component>'}
        }
      })
      .state('patients-list', {
        url: '/patients-list',
        views: {
          main: {template: '<patients-component><patients-component>'}
        }        
      })
      .state('patients-summary', {
        url: '/patients-summary',
        views: {
          banner: {template: '<patients-banner-component></patients-banner-component>'},
          actions: {template: '<patients-sidebar-component></patients-sidebar-component>'},
          main: {template: '<patients-summary-component><patients-summary-component>'}
        },
        params: {patientId: null, patientsList: null}
      });
}

export default routeConfig;