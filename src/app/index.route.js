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
      })
      .state('patients-list-full', {
        url: '/patients-full-details?ageFrom&ageTo&orderType&pageNumber&reportType&searchString&queryType',
        views: {
          main: {template: '<patients-list-full-component><patients-list-full-component>'}
        }        
      });
}

export default routeConfig;