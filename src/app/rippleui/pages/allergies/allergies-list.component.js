let templateAllergiesList = require('./allergies-list.html');

class AllergiesListController {
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions, serviceRequests, AllergiesModal, usSpinnerService) {
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

    this.go = function (id, allergySource) {
      $state.go('allergies-detail', {
        patientId: $stateParams.patientId,
        allergyIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: allergySource
      });
    };

    this.selected = function ($index) {
      return $index === $stateParams.allergyIndex;
    };

    this.create = function () {
      AllergiesModal.openModal(this.currentPatient, {title: 'Create Allergy'}, {}, this.currentUser);

    };
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.allergies.data) {
        this.allergies = data.allergies.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.allergiesLoad = allergiesActions.all;
    this.allergiesLoad($stateParams.patientId);
  }
}

const AllergiesListComponent = {
  template: templateAllergiesList,
  controller: AllergiesListController
};

AllergiesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'allergiesActions', 'serviceRequests', 'AllergiesModal', 'usSpinnerService'];
export default AllergiesListComponent;