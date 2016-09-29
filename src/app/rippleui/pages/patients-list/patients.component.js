let templatePatients = require('./patients-list.html');

class PatientsController {
    constructor($scope, $state, $ngRedux, patientsActions) {

        let unsubscribe = $ngRedux.connect(state => ({
            isFetching: state.patients.isFetching,
            error: state.patients.error,
            patients: state.patients.data
        }))(this);

        $scope.$on('$destroy', unsubscribe);

        this.loadPatientsList = patientsActions.loadPatients;
        this.loadPatientsList();
    }
}

const PatientsComponent = {
    template: templatePatients,
    controllerAs: 'vm',
    controller: PatientsController
};

PatientsController.$inject = ['$scope', '$state', '$ngRedux', 'patientsActions'];
export default PatientsComponent;