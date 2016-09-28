let templateHome = require('./home.html');

class HomeController {
  constructor($state, ServiceRequest) {
    this.goToPatientsList = function () {
      $state.go('patients');
    }
  }
}

const HomeComponent = {
  template: templateHome,

  controller: HomeController
};

HomeController.$inject = ['$state', 'serviceRequest'];
export default HomeComponent;
