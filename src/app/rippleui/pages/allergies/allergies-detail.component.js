let templateAllergiesDetail= require('./allergies-detail.html');

class AllergiesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions, AllergiesModal) {
    this.edit = function () {
      AllergiesModal.openModal(this.currentPatient, {title: 'Edit Allergy'}, this.allergy, this.currentUser);
    };

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    $scope.isLocked = function (diagnosis) {
      if (!(diagnosis && diagnosis.id)) {
        return true;
      }

      var diagnosisIdSegments = diagnosis.id.toString().split('::');
      if (diagnosisIdSegments.length > 1) {
        return ($scope.UnlockedSources.indexOf(diagnosisIdSegments[1]) < 0);
      }

      return true;
    };

    this.convertToLabel = function (text) {
      var result = text.replace(/([A-Z])/g, ' $1');
      return result.charAt(0).toUpperCase() + result.slice(1);
    };

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.allergiesGet.data) {
        this.allergy = data.allergiesGet.data;
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

AllergiesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'allergiesActions', 'AllergiesModal'];
export default AllergiesDetailComponent;