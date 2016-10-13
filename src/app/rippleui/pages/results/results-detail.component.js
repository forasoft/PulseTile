let templateResultsDetail= require('./results-detail.html');

class ResultsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, resultsActions) {

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.resultsGet.data) {
        this.result = data.resultsGet.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.allergiesLoad = resultsActions.get;
    this.allergiesLoad($stateParams.patientId, $stateParams.resultIndex, $stateParams.source);
  }
}

const ResultsDetailComponent = {
  template: templateResultsDetail,
  controller: ResultsDetailController
};

ResultsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'resultsActions'];
export default ResultsDetailComponent;