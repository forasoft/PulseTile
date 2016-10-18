export default function ReferralsModal($uibModal, referralsActions, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, referral, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./referrals-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          var updateId = function (sourceId) {
            var sourceArr = sourceId.split('::');
            var newVersionNumber = parseInt(sourceArr[2]) + 1;
            var newId = sourceArr[0] + '::' + sourceArr[1] + '::' + newVersionNumber;
            return newId;
          };

          $scope.patient = patient;
          $scope.referral = referral;
          $scope.modal = modal;
          $scope.currentUser = currentUser;

          if (modal.title === 'Create Referral') {
            $scope.isEdit = false;
            $scope.referral.dateCreated = new Date().toISOString().slice(0, 10);
            $scope.author = $scope.currentUser;
          } else {
            $scope.isEdit = true;
            $scope.referral.dateCreated = new Date($scope.referral.dateCreated).toISOString().slice(0, 10);
            $scope.referral.dateOfReferral = new Date($scope.referral.dateOfReferral).toISOString().slice(0, 10);
          }

          $scope.openDatepicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.ok = function (referralForm, referral) {
            $scope.formSubmitted = true;
            if (referralForm.$valid) {

              $uibModalInstance.close(referral);

              if ($scope.isEdit) {

                referral.dateOfReferral = new Date(referral.dateOfReferral);
                referral.dateOfReferral.setMinutes(referral.dateOfReferral.getMinutes() - referral.dateOfReferral.getTimezoneOffset());

                var toUpdate = {
                  sourceId: referral.sourceId,
                  author: referral.author,
                  clinicalSummary: referral.clinicalSummary,
                  dateCreated: new Date(referral.dateCreated),
                  dateOfReferral: referral.dateOfReferral,
                  reason: referral.reason,
                  referralFrom: referral.referralFrom,
                  referralTo: referral.referralTo,
                  source: 'openehr'
                };

                $scope.referralsUpdate($scope.patient.id, toUpdate);

                $state.go('referrals-detail', {
                  patientId: $scope.patient.id,
                  referralId: updateId(referral.sourceId),
                  page: $scope.currentPage,
                  reportType: $stateParams.reportType,
                  searchString: $stateParams.searchString,
                  queryType: $stateParams.queryType
                });

              } else {

                referral.dateOfReferral = new Date(referral.dateOfReferral);
                referral.dateOfReferral.setMinutes(referral.dateOfReferral.getMinutes() - referral.dateOfReferral.getTimezoneOffset());

                var toAdd = {
                  sourceId: '',
                  author: referral.author,
                  clinicalSummary: referral.clinicalSummary,
                  dateCreated: new Date(referral.dateCreated),
                  dateOfReferral: referral.dateOfReferral,
                  reason: referral.reason,
                  referralFrom: referral.referralFrom,
                  referralTo: referral.referralTo,
                  source: 'openehr'
                };

                $scope.referralsCreate($scope.patient.id, toAdd);

                $state.go('referrals', {
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

          $scope.referralsCreate = referralsActions.create;
          $scope.referralsUpdate = referralsActions.update;
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
ReferralsModal.$inject = ['$uibModal', 'referralsActions', '$stateParams'];