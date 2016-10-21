export default function AppointmentsModal($uibModal, appointmentsActions, $ngRedux) {
  var isModalClosed = true;

  var openModal = function (patient, modal, appointment, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./appointments-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.eventSource = {

          };
          $scope.currentUser = currentUser;
          $scope.appointment = appointment;
          $scope.patient = patient;
          $scope.modal = modal;
          $scope.radioModel = 'Tab1';
          $scope.appointment.location = appointment.location || 'Leeds General';
          $scope.appointment.status = appointment.status || 'Not Scheduled';

          if (modal.title === 'Edit Appointment') {
            $scope.isEdit = true;
            $scope.appointment.dateCreated = new Date($scope.appointment.dateCreated).toISOString();
            $scope.appointment.dateOfAppointment = new Date($scope.appointment.dateOfAppointment).toISOString();
            $scope.appointment.timeOfAppointment = new Date($scope.appointment.timeOfAppointment);
          }
          else {
            $scope.isEdit = false;
            $scope.appointment.dateCreated = new Date().toISOString().slice(0, 10);
          }

          if ($scope.appointment.status === 'Scheduled') {
            $scope.timeSlotFull = moment(appointment.timeOfAppointment).format('h:mma') + '-' + moment(appointment.timeOfAppointment).add(59, 'm').format('h:mma');
          }


          $scope.uiConfig = {
            calendar: {
              height: 450,
              width: 400,
              editable: true,
              aspectRatio: 1.7,
              defaultDate: '2015-02-12',
              Duration: '01:00:00',
              lang: 'en-gb',
              eventColor: '#378006',
              events: [
                { title: 'Time Slot 1', start: '2015-02-09 09:00', end: '2015-02-09 09:59' },
                { title: 'Time Slot 2', start: '2015-02-09 10:00', end: '2015-02-09 10:59' },
                { title: 'Time Slot 3', start: '2015-02-09 11:00', end: '2015-02-09 11:59' },
                { title: 'Time Slot 4', start: '2015-02-09 12:00', end: '2015-02-09 12:59' },
                { title: 'Time Slot 5', start: '2015-02-09 13:00', end: '2015-02-09 13:59' },
                { title: 'Time Slot 6', start: '2015-02-09 14:00', end: '2015-02-09 14:59' },
                { title: 'Time Slot 7', start: '2015-02-09 15:00', end: '2015-02-09 15:59' },
                { title: 'Time Slot 8', start: '2015-02-09 16:00', end: '2015-02-09 16:59' },

                { title: 'Time Slot 1', start: '2015-02-10 09:00', end: '2015-02-10 09:59' },
                { title: 'Time Slot 2', start: '2015-02-10 10:00', end: '2015-02-10 10:59' },
                { title: 'Time Slot 3', start: '2015-02-10 11:00', end: '2015-02-10 11:59' },
                { title: 'Time Slot 4', start: '2015-02-10 12:00', end: '2015-02-10 12:59' },
                { title: 'Time Slot 5', start: '2015-02-10 13:00', end: '2015-02-10 13:59' },
                { title: 'Time Slot 6', start: '2015-02-10 14:00', end: '2015-02-10 14:59' },
                { title: 'Time Slot 7', start: '2015-02-10 15:00', end: '2015-02-10 15:59' },
                { title: 'Time Slot 8', start: '2015-02-10 16:00', end: '2015-02-10 16:59' },

                { title: 'Time Slot 1', start: '2015-02-11 09:00', end: '2015-02-11 09:59' },
                { title: 'Time Slot 2', start: '2015-02-11 10:00', end: '2015-02-11 10:59' },
                { title: 'Time Slot 3', start: '2015-02-11 11:00', end: '2015-02-11 11:59' },
                { title: 'Time Slot 4', start: '2015-02-11 12:00', end: '2015-02-11 12:59' },
                { title: 'Time Slot 5', start: '2015-02-11 13:00', end: '2015-02-11 13:59' },
                { title: 'Time Slot 6', start: '2015-02-11 14:00', end: '2015-02-11 14:59' },
                { title: 'Time Slot 7', start: '2015-02-11 15:00', end: '2015-02-11 15:59' },
                { title: 'Time Slot 8', start: '2015-02-11 16:00', end: '2015-02-11 16:59' },

                { title: 'Time Slot 1', start: '2015-02-12 09:00', end: '2015-02-12 09:59' },
                { title: 'Time Slot 2', start: '2015-02-12 10:00', end: '2015-02-12 10:59' },
                { title: 'Time Slot 3', start: '2015-02-12 11:00', end: '2015-02-12 11:59' },
                { title: 'Time Slot 4', start: '2015-02-12 12:00', end: '2015-02-12 12:59' },
                { title: 'Time Slot 5', start: '2015-02-12 13:00', end: '2015-02-12 13:59' },
                { title: 'Time Slot 6', start: '2015-02-12 14:00', end: '2015-02-12 14:59' },
                { title: 'Time Slot 7', start: '2015-02-12 15:00', end: '2015-02-12 15:59' },
                { title: 'Time Slot 8', start: '2015-02-12 16:00', end: '2015-02-12 16:59' },

                { title: 'Time Slot 1', start: '2015-02-13 09:00', end: '2015-02-13 09:59' },
                { title: 'Time Slot 2', start: '2015-02-13 10:00', end: '2015-02-13 10:59' },
                { title: 'Time Slot 3', start: '2015-02-13 11:00', end: '2015-02-13 11:59' },
                { title: 'Time Slot 4', start: '2015-02-13 12:00', end: '2015-02-13 12:59' },
                { title: 'Time Slot 5', start: '2015-02-13 13:00', end: '2015-02-13 13:59', color: '#dd2b08' },
                { title: 'Time Slot 6', start: '2015-02-13 14:00', end: '2015-02-13 14:59' },
                { title: 'Time Slot 7', start: '2015-02-13 15:00', end: '2015-02-13 15:59' },
                { title: 'Time Slot 8', start: '2015-02-13 16:00', end: '2015-02-13 16:59' }
              ],
              header: {
                right: 'month,agendaWeek,agendaDay',
                center: 'title',
                left: 'prev,next'
              },
              columnFormat: {
                week: 'ddd D/M'
              },
              eventClick: function (calEvent) {
                $scope.setTimeSlot(calEvent.start);
              },
              eventMouseover: function (event) {
                if (event.color === '#dd2b08') {
                  $(this).css('cursor', 'not-allowed');
                }
              },
              eventDrop: $scope.alertOnDrop,
              eventResize: $scope.alertOnResize,
              defaultView: 'agendaWeek',
              allDaySlot: false,
              minTime: '9:00',
              maxTime: '17:00',
              weekends: false
            }
          };
          console.log($scope.uiConfig);

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.schedule = function () {
            $scope.radioModel = 'Tab2';
          };

          var isBooked = function () {
            return $scope.appointment.dateOfAppointment && $scope.appointment.timeOfAppointment;
          };

          $scope.getScheduleLabel = function () {
            return isBooked() ? ' Re-Schedule' : ' Schedule';
          };


          $scope.ok = function (allergyForm, allergies) {
            
            $scope.formSubmitted = true;
            let toAdd = {
              sourceId: '',
              cause: allergies.cause,
              causeCode: allergies.causeCode,
              causeTerminology: allergies.causeTerminology,
              reaction: allergies.reaction,
              source: allergies.source
            };

            if (allergyForm.$valid) {

              $uibModalInstance.close(allergies);

              if ($scope.isEdit) {

                $scope.appointmentsUpdate($scope.patient.id, toAdd);

                $state.go('allergies-details', {
                  patientId: $scope.patient.id,
                  filter: $scope.query,
                  page: $scope.currentPage
                }, {
                  reload: true
                });

              } else {

                $scope.appointmentsCreate($scope.patient.id, toAdd);

                $state.go('allergies', {
                  patientId: $scope.patient.id,
                  filter: $scope.query,
                  page: $scope.currentPage
                }, {
                  reload: true
                });
              }

            }
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.appointmentsCreate = appointmentsActions.create;
          $scope.appointmentsUpdate = appointmentsActions.update;
        }
      });
    }

    modalInstance.result.then(function() {
      isModalClosed = true;
    }, function() {
      isModalClosed = true;
    });

  };

  return {
    isModalClosed: isModalClosed,
    openModal: openModal
  };
}
AppointmentsModal.$inject = ['$uibModal', 'appointmentsActions', '$ngRedux'];