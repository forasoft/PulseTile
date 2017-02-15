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
const io = require('socket.io-client');

class AppointmentsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, appointmentsActions, AppointmentsModal, usSpinnerService, socketService, serviceRequests) {
    this.edit = function () {
      AppointmentsModal.openModal(this.currentPatient, {title: 'Edit Appointment'}, this.appointment, this.currentUser);
    };

    $scope.UnlockedSources = [
      'handi.ehrscape.com'
    ];
    this.currentUser = serviceRequests.currentUserData;
    $scope.currentUser = this.currentUser;
    console.log('currentUser: ', this.currentUser);
    $scope.formDisabled = true;
    $scope.messagesHistory = [];
    
    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.appointments.dataGet) {
        this.appointment = data.appointments.dataGet;
        $scope.appt = this.appointment;
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
    
    
    //var socket = socketService.socket;
    var socket = io.connect('wss://' + window.location.hostname + ':' + 8070);
    var appointmentId = $stateParams.appointmentIndex;
    var user = serviceRequests.currentUserData;
    var ROLE_DOCTOR = 'IDCR';
    var token = getCookie('JSESSIONID');

    const currentUser = $scope.currentUser || $scope.patient;

    // username field is used as ID !
    socket.emit('user:init', {
      username: currentUser.username || currentUser.sub,
      nhsNumber: currentUser.nhsNumber,
      role: currentUser.role,
      surname: currentUser.family_name,
      name: currentUser.given_name
    });

    socket.on('call:text:messages:history', function (data) {
      var role = isDoctor(user) ? 'doctor' : 'patient';
      var opponent = data.appointment[(isDoctor(user) ? 'patient' : 'doctor')];
      console.log('call:text:message:history ', data);
      for (var i = 0; i < data.messages.length; i++) {
        addTextMessage(data.messages[i].timestamp, (data.messages[i].author) ? ((role == data.messages[i].author) ? 'You' : opponent) : null, data.messages[i].message, true);
      }
    });

    socket.on('appointment:init', function(data) {
        $scope.showJoinAppointment = data.appointmentId;
        console.log('ON appointment:init', $scope.showJoinAppointment);
    });

    function isDoctor(user) {
      return user && user.role == ROLE_DOCTOR;
    }

    function addTextMessage(timestamp, author, message, prepend) {
      var msg = {};
      msg.timestamp = moment.utc(timestamp).local().format('HH:mm');
      msg.author = ( (author !== null) ? (author + ': ') : '');
      msg.message = message;
      $scope.messagesHistory.push(msg);
    }

    $scope.patient =  this.currentPatient;
    $scope.appt =  this.appointment;

    $scope.canStartAppointment = function () {
        if (!$scope.isDoctor())
            return false;

        return !$scope.isClosed && !$scope.showJoinAppointment;
    }

    $scope.isDoctor = function () {
        return currentUser && currentUser.role === 'IDCR';
    }

    $scope.canJoinAppointment = function () {
        if (!$scope.isPatient())
            return false;

        var canJoin = $scope.showJoinAppointment;
        return !$scope.isClosed && Boolean(canJoin) && canJoin == $scope.appt.sourceId;
    }

    $scope.isPatient = function () {
        return !$scope.isDoctor();
    }


    $scope.startAppointment = function () {
      console.log('startAppointment ===> ',  $scope.patient, $scope.appt);
      if (!$scope.appt) return;

      socket.emit('appointment:init', {
        patientId: $scope.patient.id,
        appointmentId: $scope.appt.sourceId
      });

      openPopup($scope.appt.sourceId);
    };

    $scope.joinAppointment = function () {
      // socket.emit('appointment:start', $scope.patient.id);
      openPopup($scope.appt.sourceId);
    };

    function openPopup(id) {
      window.windowObjectReference = window.windowObjectReference || null;
      var center = popupCenter(972, 734);
      var options = center + ',resizable=yes,scrollbars=yes,status=yes,minimizable=yes,location=no';
      if (window.windowObjectReference == null || window.windowObjectReference.closed) {
        window.windowObjectReference = window.open(window.location.origin + '/videochat/videochat.html?appointmentId=' + id,
          'Video Chat', options);
        window.windowObjectReference.focus();
      } else {
        window.windowObjectReference.focus();
      }
    }

    function popupCenter(w, h) {
      var dualScreenLeft = (window.screenLeft != undefined) ? window.screenLeft : screen.left;
      var dualScreenTop = (window.screenTop != undefined) ? window.screenTop : screen.top;

      var width = (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth) ? document.documentElement.clientWidth : screen.width;
      var height = (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight) ? document.documentElement.clientHeight : screen.height;

      var left = ((width / 2) - (w / 2)) + dualScreenLeft;
      var top = ((height / 2) - (h / 2)) + dualScreenTop;
      return 'width=' + w + ', height=' + h + ', top=' + top + ', left=' + left;
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
      $scope.showJoinAppointment = null;
      if (data.appointmentId == $stateParams.appointmentIndex) {
        socket.emit('appointment:status', {appointmentId: $stateParams.appointmentIndex, token: token});
        socket.emit('appointment:messages', {appointmentId: $stateParams.appointmentIndex, token: token});
      }
    }

    function onStatus(data) {
      console.log('onStatus ---> ', data, data.appointmentId, ' == ', $stateParams.appointmentIndex);
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

AppointmentsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'appointmentsActions', 'AppointmentsModal', 'usSpinnerService', 'socketService', 'serviceRequests'];
export default AppointmentsDetailComponent;
