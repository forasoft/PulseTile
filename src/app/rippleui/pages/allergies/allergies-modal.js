export default function AllergiesModal($uibModal, allergiesActions, $ngRedux) {
  var isModalClosed = true;

  var openModal = function (patient, modal, allergy, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./allergies-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.patient = patient;
          $scope.allergy = angular.copy(allergy);
          $scope.modal = modal;
          $scope.currentUser = currentUser;

          if (modal.title === 'Create Allergy') {
            $scope.isEdit = false;
            $scope.allergy.dateCreated = new Date();
            // $scope.allergy.dateCreated = new Date().toISOString().slice(0, 10);
            $scope.allergy.causeCode = '1239085';
            $scope.allergy.terminologyCode = '12393890';
          } else {
            $scope.isEdit = true;
            // $scope.allergy.dateSubmitted = new Date().toISOString().slice(0, 10);
            // $scope.allergy.dateCreated = new Date($scope.allergy.dateCreated).toISOString().slice(0, 10);
            $scope.allergy.dateCreated = new Date($scope.allergy.dateCreated);
          }

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
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

                $scope.allergiesUpdate($scope.patient.id, toAdd);

                $state.go('allergies-details', {
                  patientId: $scope.patient.id,
                  filter: $scope.query,
                  page: $scope.currentPage
                }, {
                  reload: true
                });

              } else {

                $scope.allergiesCreate($scope.patient.id, toAdd);

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
            $scope.allergy = angular.copy(allergy);
            $uibModalInstance.dismiss('cancel');
          };

          $scope.allergiesCreate = allergiesActions.create;
          $scope.allergiesUpdate = allergiesActions.update;
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
AllergiesModal.$inject = ['$uibModal', 'allergiesActions', '$ngRedux'];