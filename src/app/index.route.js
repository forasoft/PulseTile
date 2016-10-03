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
      });
}

export default routeConfig;