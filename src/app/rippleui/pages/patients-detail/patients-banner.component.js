let templatePatientsBanner = require('./patients-banner.html');

class PatientsBannerController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions) {
    
    let unsubscribe = $ngRedux.connect(state => ({
      patient: state.patients.data
    }))(this);

    $scope.$on('$destroy', unsubscribe);
    
    this.loadPatient = patientsActions.getPatient;
    this.loadPatient($stateParams.patientId);
  }
}

const PatientsBannerComponent = {
  template: templatePatientsBanner,
  controller: PatientsBannerController
};

PatientsBannerController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions'];
export default PatientsBannerComponent;