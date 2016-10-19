let templateDocumentsDetail= require('./documents-detail.html');

class DocumentsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, documentsActions) {

    $scope.documentType = $stateParams.documentType;

    this.setCurrentPageData = function (data) {
      if (data.documentsFindDischarge.data) {
        this.clinicalDocument = data.documentsFindDischarge.data;
      }
      if (data.documentsFindReferral.data) {
        this.clinicalDocument = data.documentsFindReferral.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    if ($scope.documentType == 'Healthlink Discharge summary') {
      this.documentsFindDischarge = documentsActions.findDischarge;
      this.documentsFindDischarge($stateParams.patientId, $stateParams.documentIndex, $stateParams.source);
    }
    else if ($scope.documentType == 'Healthlink Referral') {
      this.documentsFindReferral = documentsActions.findReferral;
      this.documentsFindReferral($stateParams.patientId, $stateParams.documentIndex, $stateParams.source);
    }
  }
}

const DocumentsDetailComponent = {
  template: templateDocumentsDetail,
  controller: DocumentsDetailController
};

DocumentsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'documentsActions'];
export default DocumentsDetailComponent;