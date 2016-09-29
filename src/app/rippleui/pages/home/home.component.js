let templateHome = require('./home.html');

class HomeController {
  constructor($scope, $state, $ngRedux) {

    this.goToPatientsList = function () {
      $state.go('patients');
    };
  }
}

const HomeComponent = {
  template: templateHome,
  controller: HomeController
};

HomeController.$inject = ['$scope', '$state', '$ngRedux'];
export default HomeComponent;
