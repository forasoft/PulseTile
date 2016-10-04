class MainController {
  constructor($rootScope, $scope, $state, $stateParams, serviceRequests) {
    
    this.getPageComponents = function (data) {
      this.userContextViewExists = ('user-context' in data.state);
      this.actionsExists = ('actions' in data.state);
      console.log('getPageComponents === ', this.userContextViewExists, this.actionsExists, data.state);
    };
    
    serviceRequests.subscriber('routeState', this.getPageComponents);
    
  }
}
const MainComponent = {
  controller: MainController
};


MainController.$inject = ['$rootScope', '$scope',  '$state', '$stateParams', 'serviceRequests'];
export default MainComponent;