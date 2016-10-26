let templateEolcareplansDetail= require('./eolcareplans-detail.html');

class EolcareplansDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, eolcareplansActions, EolcareplansModal) {
    this.edit = function () {
      EolcareplansModal.openModal(this.currentPatient, {title: 'Edit End of Life Care Document'}, this.eolcareplan, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.eolcareplansGet.data) {
        this.eolcareplan = data.eolcareplansGet.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.eolcareplansLoad = eolcareplansActions.get;
    this.eolcareplansLoad($stateParams.patientId, $stateParams.eolcareplansIndex);
  }
}

const EolcareplansDetailComponent = {
  template: templateEolcareplansDetail,
  controller: EolcareplansDetailController
};

EolcareplansDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'eolcareplansActions', 'EolcareplansModal'];
export default EolcareplansDetailComponent;