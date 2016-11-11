let templateResultsDetail= require('./results-detail.html');

class ResultsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, resultsActions, usSpinnerService) {

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.results.dataGet) {
        this.result = data.results.dataGet;
        usSpinnerService.stop('resultsDetail-spinner');
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

ResultsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'resultsActions', 'usSpinnerService'];
export default ResultsDetailComponent;