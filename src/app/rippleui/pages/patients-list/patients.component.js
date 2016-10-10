let templatePatients = require('./patients-list.html');

class PatientsController {
  constructor($scope, $state, $stateParams, $location, $ngRedux, patientsActions, serviceRequests, Patient) {
    let vm = this;

    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-list'});

    vm.sort = function (field) {
      var reverse = vm.reverse;

      if (vm.order === field) {
        vm.reverse = !reverse;
      } else {
        vm.order = field;
        vm.reverse = !reverse;
      }
    };

    vm.sortClass = function (field) {
      if (vm.order === field) {
        return vm.reverse ? 'sort-desc' : 'sort-asc';
      }
    };

    vm.go = function (patient) {
      $state.go('patients-summary', {
        patientId: patient.id,
        patientsList: vm.patients
      });
    };

    vm.patientFilter = function (patient) {
      if (vm.filters.department) {
        return (patient.department === vm.filters.department);
      }

      if (vm.filters.ageRange) {
        return (patient.ageRange === vm.filters.ageRange);
      }

      return true;
    };

    vm.setPatients = function (patients) {
      var curPatients = [];

      angular.forEach(patients, function (patient) {
        var curPatient = new Patient.patient(patient);
        curPatients.push(curPatient);
      });

      vm.patients = curPatients.slice();
    };

    if ($stateParams.patientsList.length === 0 && !$stateParams.displayEmptyTable) {
      vm.order = $stateParams.order || 'name';
      vm.reverse = $stateParams.reverse === 'true';
      vm.filters = {
        department: $stateParams.department,
        ageRange: $stateParams.ageRange
      };

      let unsubscribe = $ngRedux.connect(state => ({
        isFetching: state.patients.isFetching,
        error: state.patients.error,
        // patients: state.patients.data,
        getPatients: vm.setPatients(state.patients.data)
      }))(this);

      $scope.$on('$destroy', unsubscribe);

      this.loadPatientsList = patientsActions.loadPatients;
      this.loadPatientsList();
    } else {
      // vm.patients = $stateParams.patientsList;
      vm.filters = {
        advancedSearch: true,
        advancedSearchParams: $stateParams.advancedSearchParams
      };
      vm.setPatients($stateParams.patientsList);
      $location.url($location.path());

    }

    serviceRequests.publisher('headerTitle', {title: 'Patients Lists'});
  }
}

const PatientsComponent = {
  template: templatePatients,
  controller: PatientsController
};

PatientsController.$inject = ['$scope', '$state', '$stateParams', '$location', '$ngRedux', 'patientsActions', 'serviceRequests', 'Patient'];
export default PatientsComponent;