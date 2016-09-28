let templateHeader = require('./header-bar.tmpl.html');

class HeaderController {
  constructor($state) {
    this.title = 'IDCR POC'
  }
}

const HeaderComponent = {
  template: templateHeader,

  controller: HeaderController
};

HeaderController.$inject = ['$state'];
export default HeaderComponent;
