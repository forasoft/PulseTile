let templateSearch = require('./search.html');

class SearchController {
  constructor($scope, serviceRequests, AdvancedSearch, $state) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'main-search'});
    serviceRequests.publisher('headerTitle', {title: 'Welcome'});

    this.mainSearchEnabled = true;
    this.searchExpression = '';
    this.isClickToAdvancedSearch = true;
    this.openAdvancedSearch = AdvancedSearch.openAdvancedSearch;

    serviceRequests.publisher('populateHeaderSearch', {
      headerSearch: this.searchExpression,
      headerSearchEnabled: false
    });

    this.hideSearch = function() {
      this.mainSearchEnabled = false;
      serviceRequests.publisher('populateHeaderSearch', {
        headerSearch: this.searchExpression,
        headerSearchEnabled: true
      });
    };
    
    this.searchFunction = function() {
      if(this.isClickToAdvancedSearch) {
        this.openAdvancedSearch();
      }
    };
  }
}

const SearchComponent = {
  template: templateSearch,
  controller: SearchController
};

SearchController.$inject = ['$scope', 'serviceRequests', 'AdvancedSearch', '$state'];
export default SearchComponent;