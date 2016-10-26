let templateDiagnosesDetail= require('./diagnoses-detail.html');

class DiagnosesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, diagnosesActions, DiagnosesModal, usSpinnerService) {
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
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.diagnosesGet.data) {
        this.diagnosis = data.diagnosesGet.data;
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

DiagnosesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'diagnosesActions', 'DiagnosesModal', 'usSpinnerService'];
export default DiagnosesDetailComponent;