let templateAppointmentsDetail= require('./appointments-detail.html');

class AppointmentsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, appointmentsActions, AppointmentsModal) {
    this.edit = function () {
      AppointmentsModal.openModal(this.currentPatient, {title: 'Edit Appointment'}, this.appointment, this.currentUser);
    };

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];

    $scope.formDisabled = true;

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.appointmentsGet.data) {
        this.appointment = data.appointmentsGet.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.appointmentsLoad = appointmentsActions.get;
    this.appointmentsLoad($stateParams.patientId, $stateParams.appointmentIndex, $stateParams.source);
  }
}

const AppointmentsDetailComponent = {
  template: templateAppointmentsDetail,
  controller: AppointmentsDetailController
};

AppointmentsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'appointmentsActions', 'AppointmentsModal'];
export default AppointmentsDetailComponent;