let templateAppointmentsList = require('./appointments-list.html');

class AppointmentsListController {
  constructor($scope, $state, $stateParams, $ngRedux, appointmentsActions, serviceRequests, AppointmentsModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    $scope.query = '';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      $scope.query = $stateParams.filter;
    }

    this.go = function (id, appointmentSource) {
      $state.go('appointments-detail', {
        patientId: $stateParams.patientId,
        appointmentIndex: id,
        filter: $scope.query,
        page: this.currentPage,
        source: appointmentSource
      });
    };

    this.selected = function (appointmentIndex) {
      return appointmentIndex === $stateParams.appointmentIndex;
    };

    this.create = function () {
      AppointmentsModal.openModal(this.currentPatient, {title: 'Create Appointment'}, {}, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.appointments.data) {
        this.appointments = data.appointments.data;
        // this.appointments.sort(function (a, b) {
        //   return (a.dateOfAppointment == b.dateOfAppointment) ?
        //     (a.timeOfAppointment > b.timeOfAppointment ? 1 : -1) :
        //     (a.dateOfAppointment > b.dateOfAppointment ? 1 : -1);
        // });

        for (var i = 0; i < this.appointments.length; i++) {
          if (angular.isNumber(this.appointments[i].dateOfAppointment)) {
            this.appointments[i].dateOfAppointment = moment(this.appointments[i].dateOfAppointment).format('DD-MMM-YYYY');
          }
          if (angular.isNumber(this.appointments[i].timeOfAppointment)) {
            this.appointments[i].timeOfAppointment = moment(this.appointments[i].timeOfAppointment).format('h:mma') + '-' + moment(this.appointments[i].timeOfAppointment).add(59, 'm').format('h:mma');
          }
        }
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    this.search = function (row) {
      return (
        row.dateOfAppointment.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.timeOfAppointment.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.serviceTeam.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.appointmentsLoad = appointmentsActions.all;
    this.appointmentsLoad($stateParams.patientId);
  }
}

const AppointmentsListComponent = {
  template: templateAppointmentsList,
  controller: AppointmentsListController
};

AppointmentsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'appointmentsActions', 'serviceRequests', 'AppointmentsModal', 'usSpinnerService'];
export default AppointmentsListComponent;