let templatePatients = require('./patients-list.html');

class PatientsController {
    constructor($scope, $state, $stateParams, $location, $ngRedux, patientsActions, serviceRequests) {
        
        let vm = this;
        
        vm.order = $stateParams.order || 'name';
        vm.reverse = $stateParams.reverse === 'true';
        vm.filters = {
            department: $stateParams.department,
            ageRange: $stateParams.ageRange
        };

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

        let unsubscribe = $ngRedux.connect(state => ({
            isFetching: state.patients.isFetching,
            error: state.patients.error,
            patients: state.patients.data
        }))(this);

        $scope.$on('$destroy', unsubscribe);

        this.loadPatientsList = patientsActions.loadPatients;
        this.loadPatientsList();

        serviceRequests.publisher('headerTitle', {title: 'Patients Lists'});
    }
}

const PatientsComponent = {
    template: templatePatients,
    controller: PatientsController
};

PatientsController.$inject = ['$scope', '$state', '$stateParams', '$location', '$ngRedux', 'patientsActions', 'serviceRequests'];
export default PatientsComponent;