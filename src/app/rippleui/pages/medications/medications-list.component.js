let templateMedicationsList = require('./medications-list.html');

class MedicationsListController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, serviceRequests, MedicationsModal, usSpinnerService) {
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

    this.go = function (id, medicationSource) {
      $state.go('medications-detail', {
        patientId: $stateParams.patientId,
        medicationIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: medicationSource
      });
    };

    this.selected = function (medicationIndex) {
      return medicationIndex === $stateParams.medicationIndex;
    };


    this.create = function () {
      MedicationsModal.openModal(this.currentPatient, {title: 'Create Medication'}, {}, this.currentUser);

    };
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.medication.data) {
        this.medications = data.medication.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.medicationsLoad = medicationsActions.all;
    this.medicationsLoad($stateParams.patientId);
  }
}

const MedicationsListComponent = {
  template: templateMedicationsList,
  controller: MedicationsListController
};

MedicationsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'serviceRequests', 'MedicationsModal', 'usSpinnerService'];
export default MedicationsListComponent;