routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

function routeConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  console.log('routing test');
  $stateProvider
      // .state('main', {
      //   template: '<ui-view />'
      // })
      .state('home', {
        url: '/',
        template: '<home-component><home-component>'
      });
}

export default routeConfig;