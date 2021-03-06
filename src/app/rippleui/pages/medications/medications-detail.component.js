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
      if (data.medication.dataUpdate !== null) {
        $scope.medicationsLoad($stateParams.patientId);
      }
    };

    $scope.panelOpen = '';

    this.openPanel = function (namePanel) {
      $scope.panelOpen = namePanel;
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.allergiesLoad = medicationsActions.get;
    this.allergiesLoad($stateParams.patientId, $stateParams.medicationIndex, $stateParams.source);

    //Edit Medication

    $scope.routes = [
      'Po Per Oral',
      'IV Intra Venous',
      'PN Per Nasal',
      'PR Per Rectum',
      'SL Sub Lingual',
      'SC Sub Cutaneous',
      'IM Intra Muscular'
    ];
    
    $scope.isEdit = false;
    
    this.edit = function () {
      $scope.isEdit = true;

      $scope.currentUser = this.currentUser;
      // $scope.medicationEdit = this.medication;
      $scope.medicationEdit = Object.assign({}, this.medication)
      $scope.patient = this.currentPatient;

      $scope.medicationEdit.startTime = new Date($scope.medicationEdit.startTime);
      $scope.medicationEdit.startDate = new Date($scope.medicationEdit.startDate);
      $scope.medicationEdit.dateCreated = new Date($scope.medicationEdit.dateCreated);
      // MedicationsModal.openModal(this.currentPatient, {title: 'Edit Medication'}, this.medication, this.currentUser);
    };
    $scope.openDatepicker = function ($event, name) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope[name] = true;
    };
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };
    $scope.confirmEdit = function (medicationForm, medication) {
      
      $scope.formSubmitted = true;
      let toAdd = {
        sourceId: '',
        doseAmount: medication.doseAmount,
        doseDirections: medication.doseDirections,
        doseTiming: medication.doseTiming,
        medicationCode: medication.medicationCode,
        medicationTerminology: medication.medicationTerminology,
        name: medication.name,
        route: medication.route,
        startDate: medication.startDate,
        startTime: medication.startTime,
        author: medication.author,
        dateCreated: medication.dateCreated
      };

      if (medicationForm.$valid) {
        this.medication = Object.assign(this.medication, $scope.medicationEdit);
        $scope.isEdit = false;
        $scope.medicationsUpdate($scope.patient.id, toAdd);

      }
    }.bind(this);

    $scope.medicationsLoad = medicationsActions.all;
    $scope.medicationsUpdate = medicationsActions.update;
  }
}

const MedicationsDetailComponent = {
  template: templateMedicationsDetail,
  controller: MedicationsDetailController
};

MedicationsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'MedicationsModal', 'usSpinnerService'];
export default MedicationsDetailComponent;