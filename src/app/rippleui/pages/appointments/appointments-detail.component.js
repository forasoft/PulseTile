/*
  ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
  ~  
  ~  Licensed under the Apache License, Version 2.0 (the "License");
  ~  you may not use this file except in compliance with the License.
  ~  You may obtain a copy of the License at
  ~  
  ~    http://www.apache.org/licenses/LICENSE-2.0

  ~  Unless required by applicable law or agreed to in writing, software
  ~  distributed under the License is distributed on an "AS IS" BASIS,
  ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~  See the License for the specific language governing permissions and
  ~  limitations under the License.
*/
let templateAppointmentsDetail= require('./appointments-detail.html');

class AppointmentsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, appointmentsActions, AppointmentsModal, AppointmentChatModal, usSpinnerService, socketService, serviceRequests) {
    this.edit = function () {
      AppointmentsModal.openModal(this.currentPatient, {title: 'Edit Appointment'}, this.appointment, this.currentUser);
    };

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];
    this.currentUser = serviceRequests.currentUserData;
    console.log('currentUser: ', this.currentUser);
    $scope.formDisabled = true;
    $scope.messagesHistory = [];
    
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.appointments.dataGet) {
        this.appointment = data.appointments.dataGet;
        usSpinnerService.stop('appointmentsDetail-spinner');
      }
      // if (data.user.data) {
      //   this.currentUser = serviceRequests.currentUserData;
      //   console.log('currentUser: ', this.currentUser);
      // }
    };

    window.onbeforeunload = function (e) {
      var dialogText = 'Please, close the appointment by pressing "End call" or the appointment will stay active!';
      e.returnValue = dialogText;
      return dialogText;
    };

    function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    }
    
    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.appointmentsLoad = appointmentsActions.get;
    this.appointmentsLoad($stateParams.patientId, $stateParams.appointmentIndex, $stateParams.source);
    
    
    var socket = socketService.socket;
    var appointmentId = $stateParams.appointmentIndex;
    var user = serviceRequests.currentUserData;
    var ROLE_DOCTOR = 'IDCR';
    var token = getCookie('JSESSIONID');
    
    socket.on('call:text:messages:history', function (data) {
      var role = isDoctor(user) ? 'doctor' : 'patient';
      var opponent = data.appointment[(isDoctor(user) ? 'patient' : 'doctor')];
      console.log('call:text:message:history ', data);
      for (var i = 0; i < data.messages.length; i++) {
        addTextMessage(data.messages[i].timestamp, (data.messages[i].author) ? ((role == data.messages[i].author) ? 'You' : opponent) : null, data.messages[i].message, true);
      }
    });

    function isDoctor(user) {
      return user && user.role == ROLE_DOCTOR;
    }

    function addTextMessage(timestamp, author, message, prepend) {
      console.log('addTextMessage1111 ---> ', timestamp, author, message, prepend);
      var msg = {};
      msg.timestamp = moment.utc(timestamp).local().format('HH:mm');
      msg.author = ( (author !== null) ? (author + ': ') : '');
      msg.message = message;
      $scope.messagesHistory.push(msg);
    }

    $scope.patient =  this.currentPatient;
    $scope.appt =  this.appointment;
    $scope.startAppointment = function () {
      console.log('startAppointment ==222=> ',  $scope.patient, $scope.appt);
      if (!$scope.appt) return;
      socket.emit('appointment:init', {
        patientId: $scope.patient.id,
        appointmentId: $scope.appt.sourceId,
        token: token
      });

      openPopup($scope.appt.sourceId);
    };

    $scope.joinAppointment = function () {
      // socket.emit('appointment:start', $scope.patient.id);
      openPopup($scope.appt.sourceId);
    };

    function openPopup(id) {
      AppointmentChatModal.openModal(socket, appointmentId, token);
    }

    socket.emit('appointment:status', {appointmentId: $stateParams.appointmentIndex, token: token});
    socket.off('appointment:messages'); // remove dublicate socket listeners
    socket.off('appointment:close');
    socket.off('appointment:status');
    socket.on('appointment:messages', onMessages);
    socket.on('appointment:close', onClose);
    socket.on('appointment:status', onStatus);

    function onMessages(dt) {
      console.log('onMessages ---> ', dt);
      var data = JSON.parse(JSON.stringify(dt));
      usSpinnerService.stop('appointmentsDetail-spinner');
      if (!data.appointment || $state.current.name != 'appointments-detail' || $stateParams.appointmentIndex != data.appointmentId) return;

      $scope.messages = data.messages.map(function (message) {
        message.timestamp = moment(+message.timestamp).format('HH:mm');
        if (!message.author) {
          message.author = '';
        } else {
          var role = ($scope.currentUser.permissions.indexOf('WRITE') == -1) ? 'patient' : 'doctor';
          var opponent = ($scope.currentUser.permissions.indexOf('WRITE') == -1) ? 'doctor' : 'patient';
          if (message.author == role) {
            message.author = 'You: ';
          } else {
            message.author = data.appointment[opponent] + ': ';
          }
        }
        return message;
      });
    }

    function onClose(data) {
      console.log('onClose ---> ', data);
      socket.data('showJoinAppointment', null);
      if (data.appointmentId == $stateParams.appointmentIndex) {
        socket.emit('appointment:status', {appointmentId: $stateParams.appointmentIndex});
        socket.emit('appointment:messages', {appointmentId: $stateParams.appointmentIndex});
      }
    }

    function onStatus(data) {
      console.log('onStatus ---> ', data.appointmentId, ' == ', $stateParams.appointmentIndex);
      if (data.appointmentId == $stateParams.appointmentIndex) {
        $scope.isClosed = data.isClosed;
      }
    }

  }
}

const AppointmentsDetailComponent = {
  template: templateAppointmentsDetail,
  controller: AppointmentsDetailController
};

AppointmentsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'appointmentsActions', 'AppointmentsModal', 'AppointmentChatModal', 'usSpinnerService', 'socketService', 'serviceRequests'];
export default AppointmentsDetailComponent;