let templateTransferOfCareDetail= require('./transfer-of-care-detail.html');

class TransferOfCareDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, transferOfCareActions) {

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.transferOfCareGet.data) {
        this.transferOfCare = data.transferOfCareGet.data;
        this.allergies = data.transferOfCareGet.data.allergies;
        this.contacts = data.transferOfCareGet.data.contacts;
        this.problems = data.transferOfCareGet.data.problems;
        this.medications = data.transferOfCareGet.data.medications;
        this.dateOfTransfer = data.transferOfCareGet.data.dateOfTransfer;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.transferOfCareLoad = transferOfCareActions.get;
    this.transferOfCareLoad($stateParams.patientId, $stateParams.transferOfCareIndex);
  }
}

const TransferOfCareDetailComponent = {
  template: templateTransferOfCareDetail,
  controller: TransferOfCareDetailController
};

TransferOfCareDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'transferOfCareActions'];
export default TransferOfCareDetailComponent;