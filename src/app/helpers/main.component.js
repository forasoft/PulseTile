class MainController {
  constructor($rootScope, $scope, $state, $stateParams, serviceRequests) {
    $scope.previousState = '';
    $scope.pageHeader = '';
    $scope.previousPage = '';

    $scope.mainWidth = 0;
    $scope.detailWidth = 0;
    $scope.getState = function (state) {
      switch (state.name) {
        case 'main-search':
          $scope.previousState = '';
          $scope.pageHeader = 'Welcome';
          $scope.previousPage = '';
          $scope.mainWidth = 12;
          $scope.detailWidth = 0;
          break;
        case 'patients-list':
          $scope.previousState = 'patients-charts';
          $scope.pageHeader = 'Patient Lists';
          $scope.previousPage = 'Patient Dashboard';
          $scope.mainWidth = 12;
          $scope.detailWidth = 0;
          break;
        case 'patients-charts':
          $scope.previousState = '';
          $scope.pageHeader = 'Patient Dashboard';
          $scope.previousPage = '';
          $scope.mainWidth = 12;
          $scope.detailWidth = 0;
          break;
        case 'patients-summary':
          $scope.previousState = 'patients-list';
          $scope.pageHeader = 'Patient Summary';
          $scope.previousPage = 'Patient Lists';
          $scope.mainWidth = 12;
          $scope.detailWidth = 0;
          break;
        case 'patients-lookup':
          $scope.previousState = '';
          $scope.pageHeader = 'Patients lookup';
          $scope.previousPage = '';
          $scope.mainWidth = 6;
          $scope.detailWidth = 6;
          break;
        case 'search-report':
          $scope.previousState = 'patients-charts';
          $scope.pageHeader = 'Report Search';
          $scope.previousPage = 'Patient Dashboard';
          $scope.mainWidth = 12;
          $scope.detailWidth = 0;
          break;
        case 'patients-list-full':
          $scope.previousState = 'patients-charts';
          $scope.pageHeader = 'Patients Details';
          $scope.previousPage = 'Patient Dashboard';
          $scope.mainWidth = 12;
          $scope.detailWidth = 0;
          break;
        default:
          $scope.previousState = 'patients-list';
          $scope.pageHeader = 'Patients Details';
          $scope.previousPage = 'Patient Lists';
          $scope.mainWidth = 6;
          $scope.detailWidth = 6;
          break;
        }
    };
    
    this.getPageComponents = function (data) {
      $scope.getState(data);
      $scope.userContextViewExists = ('banner' in data.state);
      $scope.actionsExists = ('actions' in data.state);
    };
    
    serviceRequests.subscriber('routeState', this.getPageComponents);
    
  }
}
const MainComponent = {
  template: require('./main.html'),
  controller: MainController
};

MainController.$inject = ['$rootScope', '$scope',  '$state', '$stateParams', 'serviceRequests'];
export default MainComponent;