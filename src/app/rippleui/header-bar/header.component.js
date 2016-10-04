let templateHeader = require('./header-bar.tmpl.html');

class HeaderController {
  constructor($scope, $state, $ngRedux, userActions) {
    
    this.pageHeader = 'Patients Dashboard';
    
    this.goHome = function () {
      $state.go('home');
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
  }
}

const HeaderComponent = {
  template: templateHeader,
  controller: HeaderController
};

HeaderController.$inject = ['$scope', '$state', '$ngRedux', 'userActions'];
export default HeaderComponent;
