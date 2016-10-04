let templatePatientsSidebar = require('./patients-sidebar.html');

class PatientsSidebarController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions) {
    console.log('PatientsSidebarController', $stateParams);
   
  }
}

const PatientsSidebarComponent = {
  template: templatePatientsSidebar,
  controller: PatientsSidebarController
};

PatientsSidebarController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions'];
export default PatientsSidebarComponent;