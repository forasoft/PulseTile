let templateDiagnosesList = require('./diagnoses-list.html');

class DiagnosesListController {
  constructor($scope, $state, $stateParams, $ngRedux, diagnosesActions, serviceRequests, DiagnosesModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    $scope.query = '';
    
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
        filter: $scope.query,
        page: this.currentPage,
        source: diagnosisSource
      });
    };

    this.create = function () {
      DiagnosesModal.openModal(this.currentPatient, {title: 'Create Problem / Diagnosis'}, {}, this.currentUser);
    };

    this.selected = function (diagnosisIndex) {
      return diagnosisIndex === $stateParams.diagnosisIndex;
    };

    this.search = function (row) {
      return (
          row.problem.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
          row.dateOfOnset.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
          row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.diagnoses.data) {
        this.diagnoses = data.diagnoses.data;
        for (var i = 0; i < this.diagnoses.length; i++) {
          this.diagnoses[i].dateOfOnset = moment(this.diagnoses[i].dateOfOnset).format('DD-MMM-YYYY');
        }
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

DiagnosesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'diagnosesActions', 'serviceRequests', 'DiagnosesModal', 'usSpinnerService'];
export default DiagnosesListComponent;