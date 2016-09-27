let templateApp = require('./app.html');

class AppController {
  constructor($state) {
    console.log('AppController');
  }
}

const AppComponent = {
  template: templateApp,

  controller: AppController
};

AppController.$inject = ['$state'];
export default AppComponent;