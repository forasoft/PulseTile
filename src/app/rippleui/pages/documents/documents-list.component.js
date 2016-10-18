let templateDocumentsList = require('./documents-list.html');

class DocumentsListController {
  constructor($scope, $state, $stateParams, $ngRedux, documentsActions, serviceRequests) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    this.query = '';

    $scope.search = function (row) {
      return (
        angular.lowercase(row.documentType).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.documentDate).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase($scope.query) || '') !== -1
      );
    };

    if ($stateParams.filter) {
      this.query = $stateParams.filter;
    }
    
    this.go = function (id, documentType, source) {
      $state.go('documents-detail', {
        patientId: $scope.patient.id,
        documentType: documentType,
        documentIndex: id,
        filter: $scope.query,
        page: $scope.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: source
      });
    };

    $scope.selected = function (documentIndex) {
      return documentIndex === $stateParams.documentIndex;
    };

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.documents.data) {
        this.documents = data.documents.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.documentsLoad = documentsActions.findAllDocuments;
    this.documentsLoad($stateParams.patientId);

  }
}

const DocumentsListComponent = {
  template: templateDocumentsList,
  controller: DocumentsListController
};

DocumentsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'documentsActions', 'serviceRequests'];
export default DocumentsListComponent;