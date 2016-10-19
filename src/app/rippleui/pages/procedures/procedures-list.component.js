let templateProceduresList = require('./procedures-list.html');

class ProceduresListController {
  constructor($scope, $state, $stateParams, $ngRedux, proceduresActions, serviceRequests, ProceduresModal) {
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
      $scope.query = $stateParams.filter;
    }

    $scope.search = function (row) {
      return (
        angular.lowercase(row.name).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.date).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.time).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase($scope.query) || '') !== -1
      );
    };

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
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.procedures.data) {
        this.procedures = data.procedures.data;

        for (var i = 0; i < this.procedures.length; i++) {
          this.procedures[i].date = moment(this.procedures[i].date).format('DD-MMM-YYYY');
          this.procedures[i].time = moment(this.procedures[i].time).format('HH:mm');
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

ProceduresListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'proceduresActions', 'serviceRequests', 'ProceduresModal'];
export default ProceduresListComponent;