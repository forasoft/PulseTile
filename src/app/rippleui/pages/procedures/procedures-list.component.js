let templateProceduresList = require('./procedures-list.html');

class ProceduresListController {
  constructor($scope, $state, $stateParams, $ngRedux, proceduresActions, serviceRequests, ProceduresModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      this.query = $stateParams.filter;
    }

    this.go = function (id, allergySource) {
      $state.go('procedures-detail', {
        patientId: $stateParams.patientId,
        procedureId: id,
        filter: this.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: allergySource
      });
    };

    this.selected = function (procedureId) {
      return procedureId === $stateParams.procedureId;
    };

    this.create = function () {
      ProceduresModal.openModal(this.currentPatient, {title: 'Create Procedure'}, {}, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.procedures.data) {
        this.procedures = data.procedures.data;

        for (var i = 0; i < this.procedures.length; i++) {
          if (angular.isNumber(this.procedures[i].date)) {
            this.procedures[i].date = moment(this.procedures[i].date).format('DD-MMM-YYYY');
          }
          if (angular.isNumber(this.procedures[i].time)) {
            this.procedures[i].time = moment(this.procedures[i].time).format('HH:mm');
          }
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

    this.proceduresLoad = proceduresActions.all;
    this.proceduresLoad($stateParams.patientId);
  }
}

const ProceduresListComponent = {
  template: templateProceduresList,
  controller: ProceduresListController
};

ProceduresListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'proceduresActions', 'serviceRequests', 'ProceduresModal', 'usSpinnerService'];
export default ProceduresListComponent;