let templateSearch = require('./search.html');

class SearchController {
  constructor($scope, $state, $stateParams, $ngRedux, serviceRequests) {

    serviceRequests.publisher('headerTitle', {title: 'Welcome'});
    
    this.mainSearchEnabled = true;
    // $scope.searchExpression = '';
    //
    // $scope.isClickToAdvancedSearch = true;
    //
    // $scope.openAdvancedSearch = AdvancedSearch.openAdvancedSearch;
    //
    // $scope.$emit('toggleHeaderSearchEnabled', false);
    //
    // $scope.hideSearch = function() {
    //   $scope.mainSearchEnabled = false;
    //   $scope.$emit('toggleHeaderSearchEnabled', true);
    //   $scope.$emit('populateHeaderSearch', $scope.searchExpression);
    // };
    //
    // $scope.searchFunction = function() {
    //   if($scope.isClickToAdvancedSearch) {
    //     $scope.openAdvancedSearch();
    //   }
    // };
  }
}

const SearchComponent = {
  template: templateSearch,
  controller: SearchController
};

SearchController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'serviceRequests'];
export default SearchComponent;