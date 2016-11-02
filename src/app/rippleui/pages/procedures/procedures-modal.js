export default function ProceduresModal($uibModal, proceduresActions, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, procedure, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./procedures-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.patient = patient;
          $scope.procedure = procedure;
          $scope.modal = modal;
          $scope.currentUser = currentUser;

          if (modal.title === 'Create Procedure') {
            $scope.isEdit = false;
            $scope.procedure.dateSubmitted = new Date();
            // $scope.procedure.dateSubmitted = new Date().toISOString().slice(0, 10);
          } else {
            $scope.isEdit = true;
            $scope.procedure.time = moment($scope.procedure.time).format('LT');
            $scope.procedure.dateSubmitted = new Date($scope.procedure.dateSubmitted);
            console.log('$scope.procedure.dateSubmitted', $scope.procedure.dateSubmitted);
            // $scope.procedure.dateSubmitted = new Date($scope.procedure.dateSubmitted).toISOString().slice(0, 10);
            $scope.procedure.date = new Date($scope.procedure.date);
            console.log('$scope.procedure.date', $scope.procedure.date);
            // $scope.procedure.date = new Date($scope.procedure.date).toISOString().slice(0, 10);
          }

          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.ok = function (procedureForm, procedure) {
            $scope.formSubmitted = true;
            if (procedureForm.$valid) {

              $uibModalInstance.close(procedure);

              if ($scope.isEdit) {

                procedure.dateSubmitted = new Date(procedure.dateSubmitted);
                procedure.date = new Date(procedure.date);
                procedure.date.setMinutes(procedure.date.getMinutes() - procedure.date.getTimezoneOffset());

                let  toUpdate = {
                  sourceId: procedure.sourceId,
                  procedureName: procedure.procedureName,
                  procedureCode: procedure.procedureCode,
                  procedureTerminology: procedure.procedureTerminology,
                  notes: procedure.notes,
                  author: procedure.author,
                  date: procedure.date,
                  time: procedure.time,
                  performer: procedure.performer,
                  dateSubmitted: procedure.dateSubmitted,
                  source: procedure.source
                };

                $scope.proceduresUpdate($scope.patient.id, toUpdate);

                $state.go('procedures-detail', {
                  patientId: $scope.patient.id,
                  procedureId: procedure.source === 'Marand' ? procedure.updateId(medication.sourceId) : procedure.sourceId,
                  page: $scope.currentPage,
                  reportType: $stateParams.reportType,
                  searchString: $stateParams.searchString,
                  queryType: $stateParams.queryType,
                  source: $stateParams.source
                });

              } else {

                procedure.dateSubmitted = new Date(procedure.dateSubmitted);
                procedure.date = new Date(procedure.date);
                procedure.date.setMinutes(procedure.date.getMinutes() - procedure.date.getTimezoneOffset());
                procedure.time = new Date(procedure.time.valueOf() - procedure.time.getTimezoneOffset() * 60000);

                let  toAdd = {
                  sourceId: '',
                  procedureName: procedure.procedureName,
                  procedureTerminology: procedure.procedureTerminology,
                  procedureCode: procedure.procedureCode,
                  notes: procedure.notes,
                  author: procedure.author,
                  date: procedure.date,
                  time: procedure.time,
                  performer: procedure.performer,
                  dateSubmitted: procedure.dateSubmitted
                };

                $scope.proceduresCreate($scope.patient.id, toAdd);

                $state.go('procedures', {
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

          $scope.proceduresCreate = proceduresActions.create;
          $scope.proceduresUpdate = proceduresActions.update;
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
ProceduresModal.$inject = ['$uibModal', 'proceduresActions', '$stateParams'];