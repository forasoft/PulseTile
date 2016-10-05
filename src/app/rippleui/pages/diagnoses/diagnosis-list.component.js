let templateDiagnosesList = require('./diagnoses-list.html');

class DiagnosesListController {
  constructor($scope, $state, $stateParams, $ngRedux, diagnosesActions, serviceRequests, DiagnosesModal) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    this.query = '';
    
    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    this.go = function (id, diagnosisSource) {
      $state.go('diagnoses-detail', {
        patientId: $stateParams.patientId
      });
    };

    this.create = function () {
      DiagnosesModal.openModal();

    };
    
    let unsubscribe = $ngRedux.connect(state => (console.log('state ===>', state),{
      diagnoses: state.diagnoses.data
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    this.diagnosesLoad = diagnosesActions.all;
    this.diagnosesLoad($stateParams.patientId);
  }
}

const DiagnosesListComponent = {
  template: templateDiagnosesList,
  controller: DiagnosesListController
};

DiagnosesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'diagnosesActions', 'serviceRequests', 'DiagnosesModal'];
export default DiagnosesListComponent;