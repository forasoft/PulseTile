let templateHome = require('./home.html');

class HomeController {
  constructor($state) {
    console.log('HomeController');
  }
}

const HomeComponent = {
  template: templateHome,

  controller: HomeController
};

HomeController.$inject = ['$state'];
export default HomeComponent;
