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
export default function AppointmentChatModal($uibModal, $ngRedux, serviceRequests, AppointmentChatConfirmModal) {
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
            socket.emit('call:close', {appointmentId: appointmentId, token: token});
            $scope.isCloseChat = data.close;
          };
          serviceRequests.subscriber('close-chat', this.closeChat);

          this.setCurrentPageData = function (data) {
            if (data.patientsGet.data) {
              this.currentPatient = data.patientsGet.data;
            }
          };
          
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

          
          /**
           * Socket.io
           */

          function sendWebRTCMessage(message) {
            socket.emit('call:webrtc:message', {message: message, appointmentId: appointmentId, token: token});
          }

          socket.on('call:webrtc:init', function (data) {
            console.log('webrtc:init response - ' + JSON.stringify(data));
            $('#remoteVideo').removeClass('inactive');
            if (data.isInitiator) {
              createOffer();
            }
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
                  timeOfAppointment: 50400000
                }
              }
              $('#appointmentCst').text(appointment.serviceTeam);
              $('#appointmentLocation').text(appointment.location);
            });
          });

          socket.on('call:opponent:join', function (data) {
            addTextMessage(data.timestamp, null, data.message + ' has entered the chat room');
            createNotification({title: data.message + ' has entered the chat room'});
          });

          socket.on('call:busy', function () {
            if (pc.signalingState !== 'closed') {
              pc.close();
            }
            toggleVideo('#remoteVideo');
            window.close();
          });

          socket.on('call:opponent:left', function (data) {
            addTextMessage(data.timestamp, null, data.message + ' has left the chat room');
            if ($(window).data('isBlur')) {
              createNotification({
                title: data.message + ' has left the chat room'
              });
            }
            if (pc.signalingState !== 'closed') {
              pc.close();
            }
            $('#remoteVideo').attr('src', '').addClass('inactive');
            $('#noSound').hide();
            cretePeerConnection();
          });

          socket.on('call:webrtc:message', function (message) {
            if (message.type === 'offer') {
              pc.setRemoteDescription(new SessionDescription(message));
              createAnswer();
            } else if (message.type === 'answer') {
              pc.setRemoteDescription(new SessionDescription(message));
            } else if (message.type === 'candidate') {
              var candidate = new IceCandidate({sdpMLineIndex: message.label, candidate: message.candidate});
              pc.addIceCandidate(candidate);
            }
          });

          socket.on('call:text:message', function (data) {
            console.log('call:text:message');
            addTextMessage(data.timestamp, data.author, data.message);
            if ($(window).data('isBlur')) {
              createNotification({
                title: 'You received a new Message' + (data.author ? (' from ' + data.author) : ''),
                body: data.message
              });
            }
          });

         

          socket.on('call:timer', function (data) {
            console.log(data);
            clearInterval(timer);
            initTimer(data.timestamp);
          });

          socket.on('call:remoteStreamProp:get', function () {
            var remoteStreamProp = {};
            remoteStreamProp.audio = localStream.getAudioTracks()[0].enabled;
            remoteStreamProp.video = localStream.getVideoTracks()[0].enabled;
            socket.emit('call:remoteStreamProp:post', {appointmentId: appointmentId, remoteStreamProp: remoteStreamProp, token: token})
          });

          socket.on('call:remoteStreamProp:post', function (data) {
            if (!data.remoteStreamProp.audio) {
              toggleAudio();
            }
            if (!data.remoteStreamProp.video) {
              toggleVideo('#remoteVideo');
            }
          });

          socket.on('call:video:toggle', function () {
            toggleVideo('#remoteVideo');
          });

          socket.on('call:audio:toggle', function () {
            toggleAudio();
          });

          socket.on('call:close', function (data) {
            console.log('call:close on ', data);
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

          $('#muteAudio').off('click').on('click', function () {
            $(this).toggleClass('inactive').toggleClass('fa-microphone').toggleClass('fa-microphone-slash');
            toggleAudioStreams();
            socket.emit('call:audio:toggle', {appointmentId: appointmentId, token: token});
          });

          $('#muteVideo').off('click').on('click', function () {
            $(this).toggleClass('inactive').toggleClass('fa-video-camera-2').toggleClass('fa-video-camera-slash-2');
            toggleVideoStreams();
            toggleVideo('#localVideo');
            socket.emit('call:video:toggle', {appointmentId: appointmentId, token: token});
          });


          $('#restartCall').off('click').on('click', function () {
            clearTimeout(restartCallTimer);
            restartCallTimer = null;

            socket.emit('call:restart', {appointmentId: appointmentId, token: token});
          });

          $(window).on("blur focus", function (e) {
            var prevType = $(this).data("isBlur") ? 'blur' : 'focus';

            if (prevType != e.type) {
              switch (e.type) {
                case 'blur':
                  break;
                case 'focus':
                  while (notifications.length) {
                    var notification = notifications.pop();
                    notification.close();
                  }
                  break;
              }
            }

            $(this).data('isBlur', e.type == 'blur');
          });

          function toggleVideo(video_selector) {
            var $video = $(video_selector);
            $video.toggleClass('inactive');
            if (video_selector.indexOf('remote') !== -1) return;
            var src = $video.attr('src');
            if (!src) {
              src = $video.data('src');
              $video.attr('src', src);
            } else {
              $video.data('src', src);
              $video.attr('src', '');
            }
          }

          function toggleAudio() {
            $('#noSound').toggle();
          }

          function toggleAudioStreams(enabled) {
            localStream.getAudioTracks().forEach(function (stream) {
              stream.enabled = (enabled !== undefined) ? enabled : !stream.enabled;
            });
          }

          function toggleVideoStreams(enabled) {
            localStream.getVideoTracks().forEach(function (stream) {
              stream.enabled = (enabled !== undefined) ? enabled : !stream.enabled;
            });
          }

          function addTextMessage(timestamp, author, message, prepend) {
            console.log('addTextMessage ---> ', timestamp, author, message, prepend);
            var $list = $('.list-messages');
            var li = document.createElement('li');
            var textNode = document.createTextNode(moment.utc(timestamp).local().format('HH:mm') + ' - ' + ( (author !== null) ? (author + ': ') : '') + message);
            $(li).append(textNode);
            $list[(prepend) ? 'prepend' : 'append'](li);
            var height = $list[0].scrollHeight;
            $list.scrollTop(height);
          }

          function createNotification(data) {
            if (!('Notification' in window)) {
              console.log('This browser does not support desktop notification');
            } else if (Notification.permission === 'granted') {
              _createNotification(data);
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                  _createNotification(data)
                }
              });
            }
          }

          function _createNotification(data) {
            try {
              notifications.push(new Notification(data.title, {
                body: data.body,
                icon: '../images/ripple-icon.png'
              }));
              playSound('alert');
            } catch (err) {
              if (err.name == 'TypeError') { // if browser doesn't support new Notification syntax (Chrome Android)
                if (notificationServiceWorker === null) {
                  notificationServiceWorker = navigator.serviceWorker.register('/scripts/chat/sw.js');
                }
                notificationServiceWorker.then(function (registration) {
                  registration.showNotification(data.title, {
                    body: data.body,
                    icon: '../images/ripple-icon.png',
                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                  });
                  registration.getNotifications().then(function (data) {
                    notifications = [].concat(data);
                  });
                });
              }
            }
          }

          function getNotificationPermission(cb) {
            if (!('Notification' in window)) return;
            if (Notification.permission !== 'denied' || Notification.permission !== 'granted') {
              Notification.requestPermission(cb);
            }
          }

          function playSound(filename) {
            $('#notificationSound').empty().html('<audio autoplay="autoplay">' +
              '<source src="sounds/' + filename + '.mp3" type="audio/mpeg" />' +
              '<source src="sounds/' + filename + '.ogg" type="audio/ogg" />' +
              '<embed hidden="true" autostart="true" loop="false" src="sounds/' + filename + '.mp3" />' +
              '</audio>');
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
            socket.emit('call:text:message', {appointmentId: appointmentId, message: message, token: token});
          };
          
          $scope.confirmCall = function () {
            AppointmentChatConfirmModal.openModal(socket, appointmentId, token);
          };

          $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
          };

          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: this.setCurrentPageData(state)
          }))(this);

          $scope.$on('$destroy', unsubscribe);
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
AppointmentChatModal.$inject = ['$uibModal', '$ngRedux', 'serviceRequests', 'AppointmentChatConfirmModal'];
