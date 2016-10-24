let templateTransferOfCareDetail= require('./transfer-of-care-detail.html');

class TransferOfCareDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, allergiesActions) {

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.transferOfCare.data) {
        this.transferOfCare = data.transferOfCare.data;
        this.allergies = data.transferOfCare.allergies;
        this.contacts = data.transferOfCare.contacts;
        this.problems = data.transferOfCare.problems;
        this.medications = data.transferOfCare.medications;
        this.dateOfTransfer = data.transferOfCare.dateOfTransfer;
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

const TransferOfCareDetailComponent = {
  template: templateTransferOfCareDetail,
  controller: TransferOfCareDetailController
};

TransferOfCareDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions'];
export default TransferOfCareDetailComponent;