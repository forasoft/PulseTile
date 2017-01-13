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
let templateDiagnosesDetail= require('./diagnoses-detail.html');

class DiagnosesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, diagnosesActions, DiagnosesModal, usSpinnerService) {
    this.edit = function () {
      DiagnosesModal.openModal(this.currentPatient, {title: 'Edit Problem / Diagnosis'}, this.diagnosis, this.currentUser);
    };

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    $scope.isLocked = function (diagnosis) {
      if (!(diagnosis && diagnosis.id)) {
        return true;
      }

      var diagnosisIdSegments = diagnosis.id.toString().split('::');
      if (diagnosisIdSegments.length > 1) {
        return ($scope.UnlockedSources.indexOf(diagnosisIdSegments[1]) < 0);
      }

      return true;
    };

    this.convertToLabel = function (text) {
      var result = text.replace(/([A-Z])/g, ' $1');
      return result.charAt(0).toUpperCase() + result.slice(1);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.diagnoses.dataGet) {
        this.diagnosis = data.diagnoses.dataGet;
        usSpinnerService.stop('diagnosisDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.diagnosesLoad = diagnosesActions.get;
    this.diagnosesLoad($stateParams.patientId, $stateParams.diagnosisIndex, $stateParams.source);
  }
}

const DiagnosesDetailComponent = {
  template: templateDiagnosesDetail,
  controller: DiagnosesDetailController
};

DiagnosesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'diagnosesActions', 'DiagnosesModal', 'usSpinnerService'];
export default DiagnosesDetailComponent;