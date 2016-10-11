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