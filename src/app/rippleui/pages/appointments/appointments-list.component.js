let templateAppointmentsList = require('./appointments-list.html');

class AppointmentsListController {
  constructor($scope, $state, $stateParams, $ngRedux, appointmentsActions, serviceRequests, AppointmentsModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    this.query = '';

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    this.go = function (id, appointmentSource) {
      $state.go('appointments-detail', {
        patientId: $stateParams.patientId,
        appointmentIndex: id,
        filter: this.query,
        page: this.currentPage,
        source: appointmentSource
      });
    };

    this.create = function () {
      AppointmentsModal.openModal(this.currentPatient, {title: 'Create Appointment'}, {}, this.currentUser);

    };
    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.appointments.data) {
        this.appointments = data.appointments.data;
        for (var i = 0; i < this.appointments.length; i++) {
          this.appointments[i].timeOfAppointmentTo = moment(this.appointments[i].timeOfAppointment).add(59, 'm').format('h:mma');
        }
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
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