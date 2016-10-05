let templateHeader = require('./header-bar.tmpl.html');

class HeaderController {
  constructor($rootScope, $scope, $state, $stateParams, $ngRedux, userActions, AdvancedSearch, serviceRequests) {

    this.getPageHeader = function (data) {
      $scope.pageHeader = data.title;
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
    this.searchExpression = $rootScope.searchExpression;

    this.containsReportString = function () {
      return this.searchExpression.indexOf('rp ') === 0;
    };

    this.containsSettingString = function () {
      return this.searchExpression.lastIndexOf('st ') === 0;
    };

    this.containsPatientString = function () {
      return this.searchExpression.lastIndexOf('pt ') === 0;
    };

    this.containsReportTypeString = function () {
      for (var i = 0; i < this.reportTypes.length; i++) {
        if (this.searchExpression.lastIndexOf(this.reportTypes[i]) !== -1) {
          return true;
        }
      }

      return false;
    };

    this.processReportTypeMode = function () {
      for (var i = 0; i < this.reportTypes.length; i++) {
        if (this.searchExpression.lastIndexOf(this.reportTypes[i]) !== -1) {
          var arr = this.searchExpression.split(':');

          $rootScope.reportTypeString = arr[0];
          $rootScope.reportTypeSet = true;
          this.searchExpression = '';
        }
      }

      this.reportTypes = [];
    };

    this.processReportMode = function () {
      if (this.searchExpression === 'rp ') {
        this.searchExpression = '';
      }
    };

    this.processSettingMode = function () {
      if (this.searchExpression === 'st ') {
        this.searchExpression = '';
      }
    };

    this.processPatientMode = function () {
      if (this.searchExpression === 'pt ') {
        this.searchExpression = '';
      }
    };

    this.checkExpression = function () {
      if (this.autoAdvancedSearch) {
        if (this.searchExpression.length >= 3) {
          AdvancedSearch.openAdvancedSearch(this.searchExpression);
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

      if ($rootScope.reportTypeSet && this.searchExpression !== '') {
        var tempExpression = $rootScope.reportTypeString + ': ' + this.searchExpression;
        $state.go('search-report', {
          searchString: tempExpression
        });
      }

      if ($rootScope.settingsMode && this.searchExpression !== '') {
        $state.go('patients-list-full', {
          queryType: 'Setting: ',
          searchString: this.searchExpression,
          orderType: 'ASC',
          pageNumber: '1'
        });
      }

      if ($rootScope.patientMode && this.searchExpression !== '') {
        $state.go('patients-list-full', {
          queryType: 'Patient: ',
          searchString: this.searchExpression,
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
      this.searchExpression = '';
      this.reportTypes = '';
      $rootScope.reportTypeSet = false;
      $rootScope.reportTypeString = '';
    };
    serviceRequests.subscriber('headerTitle', this.getPageHeader);
  }

}

const HeaderComponent = {
  template: templateHeader,
  controller: HeaderController
};

HeaderController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$ngRedux', 'userActions', 'AdvancedSearch', 'serviceRequests'];
export default HeaderComponent;
