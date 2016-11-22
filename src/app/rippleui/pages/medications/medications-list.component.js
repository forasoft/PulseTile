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
let templateMedicationsList = require('./medications-list.html');

class MedicationsListController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, serviceRequests, MedicationsModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    this.query = '';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    this.go = function (id, medicationSource) {
      $state.go('medications-detail', {
        patientId: $stateParams.patientId,
        medicationIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: medicationSource
      });
    };

    this.selected = function (medicationIndex) {
      return medicationIndex === $stateParams.medicationIndex;
    };


    this.create = function () {
      MedicationsModal.openModal(this.currentPatient, {title: 'Create Medication'}, {}, this.currentUser);

    };
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.medication.data) {
        this.medications = data.medication.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.medicationsLoad = medicationsActions.all;
    this.medicationsLoad($stateParams.patientId);
  }
}

const MedicationsListComponent = {
  template: templateMedicationsList,
  controller: MedicationsListController
};

MedicationsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'serviceRequests', 'MedicationsModal', 'usSpinnerService'];
export default MedicationsListComponent;