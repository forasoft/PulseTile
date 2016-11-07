export default function MedicationsModal($uibModal, medicationsActions, $ngRedux, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, medication, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./medications-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          var setCurrentPageData = function (data) {
            if (data.medication.dataCreate !== null) {
              $uibModalInstance.close(medication);
              $scope.medicationsLoad($stateParams.patientId);
              $state.go('medications', {
                patientId: $scope.patient.id,
                filter: $scope.query,
                page: $scope.currentPage
              });
            }

            if (data.medication.dataUpdate !== null) {
              $uibModalInstance.close(medication);
              $scope.medicationsLoad($stateParams.patientId);
              $state.go('medications-details', {
                patientId: $scope.patient.id,
                filter: $scope.query,
                page: $scope.currentPage
              });
            }
          };
          $scope.currentUser = currentUser;
          $scope.medication = medication;
          $scope.patient = patient;
          $scope.modal = modal;

          $scope.routes = [
            'Po Per Oral',
            'IV Intra Venous',
            'PN Per Nasal',
            'PR Per Rectum',
            'SL Sub Lingual',
            'SC Sub Cutaneous',
            'IM Intra Muscular'
          ];

          if (modal.title === 'Edit Medication'){
            $scope.isEdit = true;
            $scope.medication.startTime = new Date($scope.medication.startTime);
            $scope.medication.startDate = new Date($scope.medication.startDate);
            $scope.medication.dateCreated = new Date($scope.medication.dateCreated);
            // $scope.medication.startDate = new Date($scope.medication.startDate).toISOString().slice(0, 10);
            // $scope.medication.dateCreated = new Date($scope.medication.dateCreated).toISOString().slice(0, 10);
          }else {
            $scope.isEdit = false;
            $scope.medication.medicationCode = $scope.medication.medicationCode === undefined ? '123456789' : $scope.medication.medicationCode;
            $scope.medication.dateCreated = new Date();
            // $scope.medication.dateCreated = new Date().toISOString().slice(0, 10);
          }

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.openDatepicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.ok = function (medicationForm, medication) {
            
            $scope.formSubmitted = true;
            let toAdd = {
              sourceId: '',
              doseAmount: medication.doseAmount,
              doseDirections: medication.doseDirections,
              doseTiming: medication.doseTiming,
              medicationCode: medication.medicationCode,
              medicationTerminology: medication.medicationTerminology,
              name: medication.name,
              route: medication.route,
              startDate: medication.startDate,
              startTime: medication.startTime,
              author: medication.author,
              dateCreated: medication.dateCreated
            };

            if (medicationForm.$valid) {

              $uibModalInstance.close(medication);

              if ($scope.isEdit) {
                $scope.medicationsUpdate($scope.patient.id, toAdd);
              } else {
                $scope.medicationsCreate($scope.patient.id, toAdd);
              }

            }
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: setCurrentPageData(state)
          }))(this);
          
          $scope.$on('$destroy', unsubscribe);

          $scope.medicationsLoad = medicationsActions.all;
          $scope.medicationsCreate = medicationsActions.create;
          $scope.medicationsUpdate = medicationsActions.update;
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
MedicationsModal.$inject = ['$uibModal', 'medicationsActions', '$ngRedux', '$stateParams'];