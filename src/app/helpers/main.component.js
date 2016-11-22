/*
  ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
  ~  
  ~  Licensed under the Apache License, Version 2.0 (the "License");
  ~  you may not use this file except in compliance with the License.
  ~  You may obtain a copy of the License at
  ~  
  ~    http://www.apache.org/licenses/LICENSE-2.0

  ~  Unless required by applicable law or agreed to in writing, software
  ~  distributed under the License is distributed on an "AS IS" BASIS,
  ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~  See the License for the specific language governing permissions and
  ~  limitations under the License.
*/
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