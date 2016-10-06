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
        patientId: $stateParams.patientId,
        diagnosisIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: diagnosisSource
      });
    };

    this.create = function () {
      DiagnosesModal.openModal(this.currentPatient, {title: 'Create Problem / Diagnosis'}, {}, this.currentUser);

    };
    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.diagnoses.data) {
        this.diagnoses = data.diagnoses.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
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