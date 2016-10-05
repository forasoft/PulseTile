let templateDiagnosesDetail= require('./diagnoses-detail.html');

class DiagnosesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, diagnosesActions, DiagnosesModal) {
    this.edit = function () {
      DiagnosesModal.openModal();
    };
  }
}

const DiagnosesDetailComponent = {
  template: templateDiagnosesDetail,
  controller: DiagnosesDetailController
};

DiagnosesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'diagnosesActions', 'DiagnosesModal'];
export default DiagnosesDetailComponent;