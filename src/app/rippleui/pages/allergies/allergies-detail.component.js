let templateAllergiesDetail= require('./allergies-detail.html');

class AllergiesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions, AllergiesModal, usSpinnerService) {
    this.edit = function () {
      AllergiesModal.openModal(this.currentPatient, {title: 'Edit Allergy'}, this.allergy, this.currentUser);
    };

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.allergies.dataGet) {
        this.allergy = data.allergies.dataGet;
        usSpinnerService.stop('allergiesDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.allergiesLoad = allergiesActions.get;
    this.allergiesLoad($stateParams.patientId, $stateParams.allergyIndex, $stateParams.source);
  }
}

const AllergiesDetailComponent = {
  template: templateAllergiesDetail,
  controller: AllergiesDetailController
};

AllergiesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'allergiesActions', 'AllergiesModal', 'usSpinnerService'];
export default AllergiesDetailComponent;