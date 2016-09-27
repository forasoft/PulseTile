let templateHeader = require('./header-bar.tmpl.html');

class HeaderController {
  constructor($state) {
    console.log('HeaderBarController');
  }
}

const HeaderComponent = {
  template: templateHeader,

  controller: HeaderController
};

HeaderController.$inject = ['$state'];
export default HeaderComponent;
