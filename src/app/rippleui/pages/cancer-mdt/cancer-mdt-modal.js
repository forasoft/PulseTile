export default function CancerMdtModal($uibModal, cancermdtActions, $ngRedux, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, cancerMdt, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./cancer-mdt-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          var updateId = function (sourceId) {
            var sourceArr = sourceId.split('::');
            var newVersionNumber = parseInt(sourceArr[2]) + 1;
            var newId = sourceArr[0] + '::' + sourceArr[1] + '::' + newVersionNumber;
            return newId;
          };

          $scope.cancerMdt = cancerMdt;
          $scope.protocol = 'http://';
          $scope.isEdit = false;

          if (modal.title === 'Edit MDT') {
            $scope.isEdit = true;
            $scope.cancerMdt.timeOfMeeting = new Date($scope.cancerMdt.timeOfMeeting);
            $scope.cancerMdt.dateOfMeeting = new Date($scope.cancerMdt.dateOfMeeting).toISOString().slice(0, 10);
            $scope.cancerMdt.dateOfRequest = new Date($scope.cancerMdt.dateOfRequest).toISOString().slice(0, 10);
          }

          $scope.patient = patient;
          $scope.modal = modal;
          $scope.currentUser = currentUser;

          $scope.changeProtocol = function (protocol) {
            switch (protocol) {
              case 'http':
                $scope.protocol = 'http://';
                break;
              case 'https':
                $scope.protocol = 'https://';
                break;
              default:
                $scope.protocol = 'http://';
            }
          };

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.validate = function (form, name, index) {
            var errorToCheckFor = name + index;

            for (var error in form.$error.required) {
              var errorName = form.$error.required[error].$name;

              if (errorName === errorToCheckFor) {
                return true;
              }
            }
          };

          $scope.validateDirty = function (form, name, index) {
            var errorToCheckFor = name + index;
            return form[errorToCheckFor].$dirty && form[errorToCheckFor].$invalid;
          };

          $scope.validateClean = function (form, name, index) {
            var errorToCheckFor = name + index;
            return form[errorToCheckFor].$dirty && form[errorToCheckFor].$valid;
          };

          $scope.ok = function (cancerMdtForm, cancerMdt) {
              console.log('cancerMdt', cancerMdt);
            
            $scope.formSubmitted = true;
            if (cancerMdtForm.$valid) {

              $uibModalInstance.close(cancerMdt);

              if ($scope.isEdit) {
                cancerMdt.dateOfMeeting = new Date(cancerMdt.dateOfMeeting);
                cancerMdt.dateOfRequest = new Date(cancerMdt.dateOfRequest);

                    console.log('cancerMdt', cancerMdt);
                if (cancerMdt.timeOfMeeting !== null) {
                  cancerMdt.timeOfMeeting = new Date(cancerMdt.timeOfMeeting);
                }

                $scope.cancermdtUpdate($scope.patient.id, cancerMdt);

                $state.go('cancerMdt-detail', {
                  patientId: $scope.patient.id,
                  cancerMdtIndex: updateId(cancerMdt.sourceId),
                  page: $scope.currentPage,
                  reportType: $stateParams.reportType,
                  searchString: $stateParams.searchString,
                  queryType: $stateParams.queryType
                });
              } else {
                cancerMdt.dateOfMeeting = new Date(cancerMdt.dateOfMeeting);
                cancerMdt.dateOfMeeting.setMinutes(cancerMdt.dateOfMeeting.getMinutes() - cancerMdt.dateOfMeeting.getTimezoneOffset());

                cancerMdt.dateOfRequest = new Date(cancerMdt.dateOfRequest);
                cancerMdt.dateOfRequest.setMinutes(cancerMdt.dateOfRequest.getMinutes() - cancerMdt.dateOfRequest.getTimezoneOffset());

                if (cancerMdt.timeOfMeeting !== null) {
                  cancerMdt.timeOfMeeting = new Date(cancerMdt.timeOfMeeting);
                  cancerMdt.timeOfMeeting.setMinutes(cancerMdt.timeOfMeeting.getMinutes() - cancerMdt.timeOfMeeting.getTimezoneOffset());
                }

                cancerMdt.compositionId = '';
                cancerMdt.source = 'openehr';

                $scope.cancermdtCreate($scope.patient.id, cancerMdt);
                $state.go('cancerMdt', {
                  patientId: $scope.patient.id,
                  filter: $scope.query,
                  page: $scope.currentPage,
                  reportType: $stateParams.reportType,
                  searchString: $stateParams.searchString,
                  queryType: $stateParams.queryType
                }, {
                  reload: true
                });

              }

            }
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.cancermdtCreate = cancermdtActions.create;
          $scope.cancermdtUpdate = cancermdtActions.update;
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
CancerMdtModal.$inject = ['$uibModal', 'cancermdtActions', '$ngRedux', '$stateParams'];