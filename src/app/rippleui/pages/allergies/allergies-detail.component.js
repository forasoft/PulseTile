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
let templateAllergiesDetail= require('./allergies-detail.html');

class AllergiesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions, AllergiesModal, usSpinnerService) {
    $scope.isEdit = false;
    
    this.edit = function () {
      $scope.isEdit = true;
      $scope.allergyEdit = Object.assign({}, this.allergy);
      $scope.allergyEdit.dateCreated = new Date(this.allergy.dateCreated);
    };
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    $scope.confirmEdit = function (allergyForm, allergies) {
      $scope.formSubmitted = true;

      let toAdd = {
        sourceId: '',
        cause: allergies.cause,
        causeCode: allergies.causeCode,
        causeTerminology: allergies.causeTerminology,
        reaction: allergies.reaction,
        source: allergies.source
      };
      if (allergyForm.$valid) {
        $scope.isEdit = false;
        this.allergy = Object.assign(this.allergy, $scope.allergyEdit);
        $scope.allergiesUpdate($scope.patient.id, toAdd);
      }
    }.bind(this);

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.allergies.dataGet) {
        this.allergy = data.allergies.dataGet;
        usSpinnerService.stop('allergiesDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.allergiesLoad = allergiesActions.get;
    this.allergiesLoad($stateParams.patientId, $stateParams.allergyIndex, $stateParams.source);
  }
}

const AllergiesDetailComponent = {
  template: templateAllergiesDetail,
  controller: AllergiesDetailController
};

AllergiesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'allergiesActions', 'AllergiesModal', 'usSpinnerService'];
export default AllergiesDetailComponent;