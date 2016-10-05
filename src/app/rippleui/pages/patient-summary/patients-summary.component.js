let templatePatientsSummary = require('./patients-summary.html');

class PatientsSummaryController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, serviceRequests) {
    
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
      console.log('toState --->', toState, section, $stateParams);
      $state.go(toState, requestHeader);
    };
    this.getPatientData = function (data) {
      if (!data.id) return false;

      this.patient = data;

      this.allergiesCount = this.patient.allergies.length;
      this.allergies = this.patient.allergies.slice(0, 5);
      
      this.diagnosesCount = this.patient.problems.length;
      this.diagnoses = this.patient.problems.slice(0, 5);
      
      this.medicationsCount = this.patient.medications.length;
      this.medications = this.patient.medications.slice(0, 5);
      
      this.contactsCount = this.patient.contacts.length;
      this.contacts = this.patient.contacts.slice(0, 5);
      
      this.transferofCaresCount = this.patient.transfers.length;
      this.transferofCareComposition = this.patient;
      
      var descendingTransferofCareComposition = [];
      for (var x = this.transferofCareComposition.transfers.length - 1; x >= 0; x--) {
        descendingTransferofCareComposition.push(this.transferofCareComposition.transfers[x]);
      }
      
      this.transferofCareComposition.transfers = descendingTransferofCareComposition;
      this.transferofCareComposition = this.transferofCareComposition.transfers.slice(0, 5);
    };

    let unsubscribe = $ngRedux.connect(state => ({
          patient: this.getPatientData(state.patients.data)
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

PatientsSummaryController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'serviceRequests'];
export default PatientsSummaryComponent;