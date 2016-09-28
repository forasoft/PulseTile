let templateHome = require('./home.html');

class HomeController {
  constructor($state, ServiceRequest) {
    ServiceRequest.getData().then(function (response) {
      console.log('response', response);
    },function (error) {
      console.log('error', error );
    });
  }
}

const HomeComponent = {
  template: templateHome,

  controller: HomeController
};

HomeController.$inject = ['$state', 'serviceRequest'];
export default HomeComponent;
