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
export default function AppointmentChatModal($uibModal, serviceRequests, AppointmentChatConfirmModal) {
  var isModalClosed = true;
  var openModal = function (socket, appointmentId, token) {
    if (isModalClosed) {
      isModalClosed = false;
      var modalInstance = $uibModal.open({
        template: require('./appointment-chat.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {

          $scope.isCloseChat = false;

          this.closeChat = function (data) {
            console.log('closeChat ', data);
            socket.emit('call:close', {appointmentId: appointmentId, token: token});
            $scope.isCloseChat = data.close;
          };
          serviceRequests.subscriber('close-chat', this.closeChat);

          var ROLE_DOCTOR = 'IDCR';
          // var socket = io('http://0.0.0.0:9000');
          var user;
          var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
          var IceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate;
          var SessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription;
          navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
          var pc; // PeerConnection
          var notificationServiceWorker = null;
          var localStream = null;
          var timer;
          var notifications = [];
          var messages = [];
          var restartCallTimer = null;
          var constraints = {
            audio: true,
            video: true
          };
         

          

          socket.on('call:init', function(data) {
            console.log('call:init --- ', data);
          });
          
          socket.on('call:getPatientInfo', function (data) {
            $.get('/api/patients/' + data.patientId).then(function (data) {
              $('#patientName').text(data.name);
              $('#patientDob').text(moment(data.dateOfBirth).format('DD-MMM-YYYY'));
              $('#patientGender').text(data.gender);
              $('#patientNhs').text(data.nhsNumber);
            });
            $.get('/api/patients/' + data.patientId + '/appointments/' + appointmentId).then(function (data) {
              var appointment = data;
              if (!appointment) {
                appointment = {
                  author: "c4h_ripple_osi",
                  dateCreated: 1446216927376,
                  dateOfAppointment: 1423612800000,
                  location: "Leeds Royal Infirmary",
                  serviceTeam: "Prostate cancer MDT Team",
                  source: "Marand",
                  sourceId: "88536cbb-2f09-4624-a8da-fd468f045e60::ripple_osi.ehrscape.c4h::3",
                  status: "Scheduled",
                  timeOfAppointment: 50400000,
                }
              }
              $('#appointmentCst').text(appointment.serviceTeam);
              $('#appointmentLocation').text(appointment.location);
            });
          });


          socket.on('call:text:message', function (data) {
            console.log('call:text:message ', data);
            addTextMessage(data.timestamp, data.author, data.message);
            if ($(window).data('isBlur')) {
              createNotification({
                title: 'You received a new Message' + (data.author ? (' from ' + data.author) : ''),
                body: data.message
              });
            }
          });

          socket.on('call:text:messages:history', function (data) {
            console.log('messages:history === ', data);
            var role = isDoctor(user) ? 'doctor' : 'patient';
            var opponent = data.appointment[(isDoctor(user) ? 'patient' : 'doctor')];
            for (var i = 0; i < data.messages.length; i++) {
              addTextMessage(data.messages[i].timestamp, (data.messages[i].author) ? ((role == data.messages[i].author) ? 'You' : opponent) : null, data.messages[i].message, true);
            }
          });

          socket.on('call:timer', function (data) {
            console.log('call:timer', data);
            clearInterval(timer);
            initTimer(data.timestamp);
          });


          socket.on('call:close', function (data) {
            console.log('call:close', data, pc);
            if (pc.signalingState !== 'closed') {
              pc.close();
            }
            if (!data) return;
            if (data.user) {
              addTextMessage(data.timestamp, null, data.user + ' has ended the conversation');
              createNotification({title: data.user + ' has ended the conversation'});
            }

            $('#remoteVideo').css('background', '').attr('src', '').addClass('inactive');
            $('#localVideo').attr('src', '').hide();

            var callDuration = getDiffTime(Date.now(), data.created_at);
            $('#endCall').hide();
            $('#closeWindow').show();
            $('#restartCall').removeClass('disabled').show();

            var endedIn = moment.utc(data.timestamp).add(60, 's').valueOf();

            console.log('moment 1', moment.utc(endedIn).diff(Date.now(), 'seconds'), moment.utc(endedIn).format('HH:mm'), moment.utc(Date.now()).format('HH:mm'));

            if (moment.utc(endedIn).diff(Date.now(), 'seconds') > 60) {
              console.log('moment rly', moment.utc(endedIn).diff(Date.now(), 'seconds'), moment.utc(endedIn).format('HH:mm'), moment.utc(Date.now()).format('HH:mm'));
              endedIn = moment.utc(Date.now()).add(59, 's').valueOf();
            }

            restartCallTimer = setTimeout(function () {
              $('#restartCall').addClass('disabled');
              $('#sendMessage button').addClass('disabled');
              clearInterval(timer);
              $('#callDuration').appendTo('.video-wrapper').empty().append('Call Ended<br/>Duration - <span id="duration">' + callDuration + '</span>');
            }, moment.utc(endedIn).diff(Date.now(), 'milliseconds'));

            $('#callDuration').appendTo('.video-wrapper').empty().append('Call Ended in: <span id="timer">01:00</span><br/>Duration - <span id="duration">' + callDuration + '</span>');

            clearInterval(timer);
            initTimer(endedIn, true);
          });

          /**
           * Events
           */


          function addTextMessage(timestamp, author, message, prepend) {
            var msg = {};
            msg.time = moment.utc(timestamp).local().format('HH:mm');
            msg.author = ( (author !== null) ? (author + ': ') : '');
            msg.text = message;
            messages.push(msg);
          }

          function isDoctor(user) {
            return user && user.role == ROLE_DOCTOR;
          }

          function initTimer(time, withoutHours) {
            console.log('initTimer', time);
            timer = setInterval(function () {
              $('#timer').text(getDiffTime(Date.now(), time, withoutHours));
            }, 1000);
          }

          function getDiffTime(from, to, withoutHours) {
            return ((withoutHours) ?
              [
                ('0' + (Math.abs(moment.utc(from).diff(to, 'minutes')) % 60)).slice(-2),
                ('0' + (Math.abs(moment.utc(from).diff(to, 'seconds')) % 60)).slice(-2)] :
              [
                ('0' + Math.abs(moment.utc(from).diff(to, 'hours'))).slice(-2),
                ('0' + (Math.abs(moment.utc(from).diff(to, 'minutes')) % 60)).slice(-2),
                ('0' + (Math.abs(moment.utc(from).diff(to, 'seconds')) % 60)).slice(-2)
              ]).join(':');
          }

          $scope.msgText = '';
          $scope.sendMsg = function (messageForm) {
            console.log('----messageForm---- ', $scope.msgText);
            var message = $scope.msgText;
            // addTextMessage(appointment, 'You', message);
            socket.emit('appointment:text:message', {appointmentId: appointmentId, message: message, token: token});
            // socket.emit('call:text:message', {appointmentId: appointmentId, message: message, token: token});
          };
          
          $scope.confirmCall = function () {
            AppointmentChatConfirmModal.openModal(socket, appointmentId, token);
          };

          $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
          };
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
AppointmentChatModal.$inject = ['$uibModal', 'serviceRequests', 'AppointmentChatConfirmModal'];
