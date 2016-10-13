let templateResultsList = require('./results-list.html');

class ResultsListController {
  constructor($scope, $state, $stateParams, $ngRedux, resultsActions, serviceRequests) {
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

    this.go = function (id, resultSource) {
      $state.go('results-detail', {
        patientId: $stateParams.patientId,
        resultIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: resultSource
      });
    };

    this.selected = function (resultIndex) {
      return resultIndex === $stateParams.resultIndex;
    };


    this.setCurrentPageData = function (data) {
      if (data.results.data) {
        this.results = data.results.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.resultsLoad = resultsActions.all;
    this.resultsLoad($stateParams.patientId);
  }
}

const ResultsListComponent = {
  template: templateResultsList,
  controller: ResultsListController
};

ResultsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'resultsActions', 'serviceRequests'];
export default ResultsListComponent;