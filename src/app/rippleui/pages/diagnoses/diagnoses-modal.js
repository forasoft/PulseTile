export default function DiagnosesModal($uibModal, diagnosesActions, $ngRedux) {
  var isModalClosed = true;
 
  var openModal = function (patient, modal, diagnosis, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./diagnoses-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          
          $scope.patient = patient;
          $scope.diagnosis = diagnosis;
          $scope.modal = modal;          
          $scope.currentUser = currentUser;

          if (modal.title === 'Edit Problem / Diagnosis') {
            $scope.isEdit = true;
            $scope.diagnosis.dateSubmitted = new Date().toISOString().slice(0, 10);
            $scope.diagnosis.dateOfOnset = new Date($scope.diagnosis.dateOfOnset).toISOString().slice(0, 10);
          }else {
            $scope.isEdit = false;
            $scope.diagnosis.dateSubmitted = new Date().toISOString().slice(0, 10);
            $scope.diagnosis.code = '12393890';
          }
          
          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };
          
          $scope.ok = function (diagnosisForm, diagnosis) {
            $scope.formSubmitted = true;
            let toAdd = {
              code: $scope.diagnosis.code,
              dateOfOnset: $scope.diagnosis.dateOfOnset,
              description: $scope.diagnosis.description,
              problem: $scope.diagnosis.problem,
              source: $scope.diagnosis.source,
              sourceId: '',
              terminology: $scope.diagnosis.terminology
            };

            if (diagnosisForm.$valid) {
              
              $uibModalInstance.close(diagnosis);
              
              if ($scope.isEdit) {
                
                $scope.diagnosesUpdate($scope.patient.id, toAdd);
                
                $state.go('diagnoses-details', {
                  patientId: $scope.patient.id,
                  filter: $scope.query,
                  page: $scope.currentPage
                }, {
                  reload: true
                });
                
              } else {
                
                $scope.diagnosesCreate($scope.patient.id, toAdd);
                
                $state.go('diagnoses-list', {
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

          $scope.diagnosesCreate = diagnosesActions.create;
          $scope.diagnosesUpdate = diagnosesActions.update;          
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
DiagnosesModal.$inject = ['$uibModal', 'diagnosesActions', '$ngRedux'];