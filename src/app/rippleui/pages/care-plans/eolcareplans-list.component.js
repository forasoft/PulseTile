let templateEolcareplansList = require('./eolcareplans-list.html');

class EolcareplansListController {
  constructor($scope, $state, $stateParams, $ngRedux, eolcareplansActions, serviceRequests, EolcareplansModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});
    var vm = this;

    this.currentPage = 1;
    this.query = '';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      vm.query = $stateParams.filter;
    }

    this.search = function (row) {
      return (
        angular.lowercase(row.name).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.type).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.date).indexOf(angular.lowercase(vm.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase(vm.query) || '') !== -1
      );
    };

    this.go = function (id) {
      $state.go('eolcareplans-detail', {
        patientId: $stateParams.patientId,
        eolcareplansIndex: id,
        filter: vm.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.selected = function (eolcareplansIndex) {
      return eolcareplansIndex === $stateParams.eolcareplansIndex;
    };

    this.create = function () {
      EolcareplansModal.openModal(this.currentPatient, {title: 'Create End of Life Care Document'}, {}, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.eolcareplans.data) {
        this.eolcareplans = data.eolcareplans.data;

        if (this.eolcareplans.length > 0) {
          for (var i = 0; i < this.eolcareplans.length; i++) {
            this.eolcareplans[i].date = moment(this.eolcareplans[i].date).format('DD-MMM-YYYY');
          }
        }
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.eolcareplansLoad = eolcareplansActions.all;
    this.eolcareplansLoad($stateParams.patientId);
  }
}

const EolcareplansListComponent = {
  template: templateEolcareplansList,
  controller: EolcareplansListController
};

EolcareplansListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eolcareplansActions', 'serviceRequests', 'EolcareplansModal', 'usSpinnerService'];
export default EolcareplansListComponent;