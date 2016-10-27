let templateCancerMdtDetail= require('./cancer-mdt-detail.html');

class CancerMdtDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, cancermdtActions, CancerMdtModal) {
    this.edit = function () {
      CancerMdtModal.openModal(this.currentPatient, {title: 'Edit MDT'}, this.cancerMdt, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.cancermdtGet.data) {
        this.cancerMdt = data.cancermdtGet.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.cancermdtLoad = cancermdtActions.get;
    this.cancermdtLoad($stateParams.patientId, $stateParams.cancerMdtIndex);
  }
}

const CancerMdtDetailComponent = {
  template: templateCancerMdtDetail,
  controller: CancerMdtDetailController
};

CancerMdtDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'cancermdtActions', 'CancerMdtModal'];
export default CancerMdtDetailComponent;