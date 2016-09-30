let templatePatientsSummary = require('./patients-summary.html');

class PatientsSummaryController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions) {

    let unsubscribe = $ngRedux.connect(state => (console.log(state),{
          patient: state.patients.data
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

PatientsSummaryController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions'];
export default PatientsSummaryComponent;