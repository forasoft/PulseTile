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
let templateMedicationsDetail= require('./medications-detail.html');

class MedicationsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, MedicationsModal, usSpinnerService) {
    this.edit = function () {
      MedicationsModal.openModal(this.currentPatient, {title: 'Edit Medication'}, this.medication, this.currentUser);
    };

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.medication.dataGet) {
        this.medication = data.medication.dataGet;
        usSpinnerService.stop('medicationsDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.allergiesLoad = medicationsActions.get;
    this.allergiesLoad($stateParams.patientId, $stateParams.medicationIndex, $stateParams.source);
  }
}

const MedicationsDetailComponent = {
  template: templateMedicationsDetail,
  controller: MedicationsDetailController
};

MedicationsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'MedicationsModal', 'usSpinnerService'];
export default MedicationsDetailComponent;