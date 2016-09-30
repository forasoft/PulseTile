let templateHome = require('./home.html');

class HomeController {
  constructor($scope, $state) {

    this.goToPatientsList = function () {
      $state.go('patients');
    };
  }
}

const HomeComponent = {
  template: templateHome,
  controller: HomeController
};

HomeController.$inject = ['$scope', '$state'];
export default HomeComponent;
