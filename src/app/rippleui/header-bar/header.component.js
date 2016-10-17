let templateHeader = require('./header-bar.tmpl.html');

class HeaderController {
  constructor($rootScope, $scope, $state, $stateParams, $ngRedux, userActions, AdvancedSearch, serviceRequests) {

    this.getPageHeader = function (data) {
      $scope.pageHeader = data.title;
      $scope.searchBar = data.title === 'Welcome' ? false : true;
    };

    this.goHome = function () {
      $state.go('patients-charts');
    };
  
    this.setTitle = function (data) {
      this.title = data ? data.role + ' POC' : '';
    };

    let unsubscribe = $ngRedux.connect(state => ({
      error: state.user.error,
      user: state.user.data,
      getTitle: this.setTitle(state.user.data)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.login = userActions.login;
    this.login();

    $rootScope.searchExpression = '';
    $rootScope.searchMode = false;
    $rootScope.reportMode = false;
    $rootScope.settingsMode = false;
    $rootScope.patientMode = false;
    $rootScope.reportTypeSet = false;
    $rootScope.reportTypeString = '';

    this.openAdvancedSearch = AdvancedSearch.openAdvancedSearch;
    $scope.search = {};
    $scope.search.searchExpression = $rootScope.searchExpression;
    this.searchBarEnabled = !$state.is('main-search');

    this.containsReportString = function () {
      return $scope.search.searchExpression.indexOf('rp ') === 0;
    };

    this.containsSettingString = function () {
      return $scope.search.searchExpression.lastIndexOf('st ') === 0;
    };

    this.containsPatientString = function () {
      return $scope.search.searchExpression.lastIndexOf('pt ') === 0;
    };

    this.containsReportTypeString = function () {
      for (var i = 0; i < this.reportTypes.length; i++) {
        if ($scope.search.searchExpression.lastIndexOf(this.reportTypes[i]) !== -1) {
          return true;
        }
      }

      return false;
    };

    this.processReportTypeMode = function () {
      for (var i = 0; i < this.reportTypes.length; i++) {
        if ($scope.search.searchExpression.lastIndexOf(this.reportTypes[i]) !== -1) {
          var arr = $scope.search.searchExpression.split(':');

          $rootScope.reportTypeString = arr[0];
          $rootScope.reportTypeSet = true;
          $scope.search.searchExpression = '';
        }
      }

      this.reportTypes = [];
    };

    this.processReportMode = function () {
      if ($scope.search.searchExpression === 'rp ') {
        $scope.search.searchExpression = '';
      }
    };

    this.processSettingMode = function () {
      if ($scope.search.searchExpression === 'st ') {
        $scope.search.searchExpression = '';
      }
    };

    this.processPatientMode = function () {
      if ($scope.search.searchExpression === 'pt ') {
        $scope.search.searchExpression = '';
      }
    };

    this.checkExpression = function (expression) {
      $scope.search.searchExpression = expression;

      if (this.autoAdvancedSearch) {
        if ($scope.search.searchExpression.length >= 3) {
          AdvancedSearch.openAdvancedSearch($scope.search.searchExpression);
        }
      } else if ($rootScope.searchMode) {
        if ($rootScope.reportMode && !$rootScope.reportTypeSet) {
          this.reportTypes = [
            'Diagnosis: ',
            'Orders: '
            ];
        }

        if (this.containsReportTypeString() && !this.patientMode) {
          $rootScope.reportTypeSet = true;
          this.processReportTypeMode();
        }
      } else {
        this.reportTypes = [];
        $rootScope.searchMode = (this.containsReportString() || this.containsSettingString() || this.containsPatientString());
        $rootScope.reportMode = this.containsReportString();
        $rootScope.settingsMode = this.containsSettingString();
        $rootScope.patientMode = this.containsPatientString();

        if ($rootScope.reportMode) {
          if (this.containsReportTypeString) {
            this.processReportTypeMode();
          }
          this.processReportMode();
        }

        if ($rootScope.settingsMode) {
          this.processSettingMode();
        }

        if ($rootScope.patientMode) {
          this.processPatientMode();
        }
      }
    };

    this.searchFunction = function () {
      if (this.autoAdvancedSearch) {
        AdvancedSearch.openAdvancedSearch();
      }

      if ($rootScope.reportTypeSet && $scope.search.searchExpression !== '') {
        var tempExpression = $rootScope.reportTypeString + ': ' + $scope.search.searchExpression;
        $state.go('search-report', {
          searchString: tempExpression
        });
      }

      if ($rootScope.settingsMode && $scope.search.searchExpression !== '') {
        $state.go('patients-list-full', {
          queryType: 'Setting: ',
          searchString: $scope.search.searchExpression,
          orderType: 'ASC',
          pageNumber: '1'
        });
      }

      if ($rootScope.patientMode && $scope.search.searchExpression !== '') {
        $state.go('patients-list-full', {
          queryType: 'Patient: ',
          searchString: $scope.search.searchExpression,
          orderType: 'ASC',
          pageNumber: '1'
        });
      }
    };

    this.cancelSearchMode = function () {
      $rootScope.reportMode = false;
      $rootScope.searchMode = false;
      $rootScope.patientMode = false;
      $rootScope.settingsMode = false;
      $scope.search.searchExpression = '';
      this.reportTypes = '';
      $rootScope.reportTypeSet = false;
      $rootScope.reportTypeString = '';
    };

    this.cancelReportType = function () {
      $rootScope.reportTypeString = '';
      $rootScope.reportTypeSet = false;
    };

    this.getPopulateHeaderSearch = function (expression) {
      $scope.search.searchExpression = expression.headerSearch;
      $scope.searchFocused = true;
      this.searchBarEnabled = expression.headerSearchEnabled;
      $scope.searchBar = expression.headerSearchEnabled;
    };

    serviceRequests.subscriber('populateHeaderSearch', this.getPopulateHeaderSearch);
    serviceRequests.subscriber('headerTitle', this.getPageHeader);
  }

}

const HeaderComponent = {
  template: templateHeader,
  controller: HeaderController
};

HeaderController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ngRedux', 'userActions', 'AdvancedSearch', 'serviceRequests'];
export default HeaderComponent;
