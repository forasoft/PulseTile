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
let templatePatientsSidebar = require('./patients-sidebar.html');

class PatientsSidebarController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions) {
    this.linksCollection = [
      {
        name: 'summary',
        link: 'patients-summary',
        title: 'Patient Summary'
      },
      {
        name: 'contacts',
        link: 'contacts',
        title: 'Contacts'
      },
      {
        name: 'diagnosis',
        link: 'diagnoses-list',
        title: 'Problems / Diagnosis'
      },
      {
        name: 'allergies',
        link: 'allergies',
        title: 'Allergies'
      },
      {
        name: 'medications',
        link: 'medications',
        title: 'Medications'
      },
      {
        name: 'orders',
        link: 'orders',
        title: 'Orders'
      },
      {
        name: 'results',
        link: 'results',
        title: 'Results'
      },
      {
        name: 'procedures',
        link: 'procedures',
        title: 'Procedures'
      },
      {
        name: 'referrals',
        link: 'referrals',
        title: 'Referrals'
      },
      {
        name: 'appointments',
        link: 'appointments',
        title: 'Appointments'
      },
      {
        name: 'transfers',
        link: 'transferOfCare',
        title: 'Transfer of Care'
      },
      {
        name: 'careplans',
        link: 'eolcareplans',
        title: 'Care Plans'
      },
      {
        name: 'mdt',
        link: 'cancerMdt',
        title: 'MDT'
      },
      {
        name: 'images',
        link: 'images',
        title: 'Images'
      },
      {
        name: 'clinicalNotes',
        link: 'clinicalNotes',
        title: 'Clinical Notes'
      },
      {
        name: 'heightAndWeights',
        link: 'heightAndWeights',
        title: 'Height & Weight'
      },
      {
        name: 'documents',
        link: 'documents',
        title: 'Documents'
      },
      {
        name: 'tags',
        link: 'tags',
        title: 'Tags'
      }
    ];

    this.goTo = function (section) {
      var requestHeader = {
        patientId: $stateParams.patientId,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      };

      $state.go(section, requestHeader);
    };
  }
}

const PatientsSidebarComponent = {
  template: templatePatientsSidebar,
  controller: PatientsSidebarController
};

PatientsSidebarController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions'];
export default PatientsSidebarComponent;