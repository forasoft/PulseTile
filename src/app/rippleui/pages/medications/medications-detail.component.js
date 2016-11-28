let templateMedicationsDetail= require('./medications-detail.html');

class MedicationsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, medicationsActions, MedicationsModal, usSpinnerService) {
    this.edit = function () {
      MedicationsModal.openModal(this.currentPatient, {title: 'Edit Medication'}, this.medication, this.currentUser);
    };

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.medication.dataGet) {
        this.medication = data.medication.dataGet;
        usSpinnerService.stop('medicationsDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.medicationsLoad = medicationsActions.get;
    this.medicationsLoad($stateParams.patientId, $stateParams.medicationIndex, $stateParams.source);
  }
}

const MedicationsDetailComponent = {
  template: templateMedicationsDetail,
  controller: MedicationsDetailController
};

MedicationsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'medicationsActions', 'MedicationsModal', 'usSpinnerService'];
export default MedicationsDetailComponent;