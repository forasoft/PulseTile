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
let templatePatientsSummary = require('./patients-summary.html');

class PatientsSummaryController {
  constructor($scope, $state, $stateParams, $ngRedux, $location, patientsActions, serviceRequests, usSpinnerService) {

    serviceRequests.publisher('headerTitle', {title: 'Patients Summary'});
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-summary'});

    this.goToSection = function (section) {
      var requestHeader = {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType
      };

      var toState = '';
      switch (section) {
        case 'Problems':
          toState = 'diagnoses-list';
          break;
        case 'Allergies':
          toState = 'allergies';
          break;
        case 'Medications':
          toState = 'medications';
          break;
        case 'Contacts':
          toState = 'contacts';
          break;
        case 'Transfer':
          toState = 'transferOfCare';
          break;
      }
      $state.go(toState, requestHeader);
    };

    function fillPatientArray(arr, count) {
      for (var i = 0; i < count; i++) {
        arr.push({});
      }
      return arr;
    }
    this.getPatientData = function (data) {
      if (!data || !data.id) return false;

      var countPatientArr = 4;
      usSpinnerService.stop('patientSummary-spinner');

      this.patient = data;

      this.allergies   = this.patient.allergies.slice(0, countPatientArr);
      this.allergies   = fillPatientArray(this.allergies, countPatientArr - this.allergies.length);

      this.diagnoses   = this.patient.problems.slice(0, countPatientArr);
      this.diagnoses   = fillPatientArray(this.diagnoses, countPatientArr - this.diagnoses.length);
      
      this.medications = this.patient.medications.slice(0, countPatientArr);
      this.medications = fillPatientArray(this.medications, countPatientArr - this.medications.length);
      
      this.contacts    = this.patient.contacts.slice(0, countPatientArr);
      this.contacts    = fillPatientArray(this.contacts, countPatientArr - this.contacts.length);

      this.transferofCareComposition = this.patient;
      
      var descendingTransferofCareComposition = [];
      for (var x = this.transferofCareComposition.transfers.length - 1; x >= 0; x--) {
        descendingTransferofCareComposition.push(this.transferofCareComposition.transfers[x]);
      }
      
      this.transferofCareComposition.transfers = descendingTransferofCareComposition;
      this.transferofCareComposition = this.transferofCareComposition.transfers.slice(0, 5);
    };

    $scope.go = function (path) {
      $location.path(path);
    };

    let unsubscribe = $ngRedux.connect(state => ({
          patient: this.getPatientData(state.patientsGet.data)
        }))(this);

    $scope.$on('$destroy', unsubscribe);
    
    this.loadPatient = patientsActions.getPatient;
    this.loadPatient($stateParams.patientId);
  }
}

const PatientsSummaryComponent = {
  template: templatePatientsSummary,
  controller: PatientsSummaryController
};

PatientsSummaryController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', '$location', 'patientsActions', 'serviceRequests', 'usSpinnerService'];
export default PatientsSummaryComponent;