// import { login } from 'app/redux/user';
//
// const requireLogin = ($q, $ngRedux) => {
//   'ngInject';
//
//   $ngRedux.dispatch(login());
//   return new Promise((resolve/*, reject*/) => {
//     const unsubscribe = $ngRedux.subscribe(() => {
//       const { user } = $ngRedux.getState();
//       if (!user.me) { return }
//
//       unsubscribe();
//       resolve(user.me);
//     });
//   });
// }
//
// export default function routeConfig($stateProvider, $urlRouterProvider) {
//   'ngInject';
//   console.log('routeConfig');
//   // Setup the apps routes
//   $stateProvider
//     .state('app', {
//       url: '/',
//       component: 'app'
//     })
//     .state('home', {
//       url: 'home',
//       component: 'home'
//     });
//
//   // set default routes when no path specified
//   $urlRouterProvider.when('', '/');
//   $urlRouterProvider.when('/', '/home');
// }

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