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
          $scope.diagnosis = angular.copy(diagnosis);
          $scope.modal = modal;
          $scope.currentUser = currentUser;
          $scope.protocol = 'http://';

          var setCurrentPageData = function (data) {
            if (data.diagnoses.dataCreate !== null) {
              $uibModalInstance.close(diagnosis);
              $state.go('diagnoses-list', {
                patientId: $scope.patient.id,
                filter: $scope.query,
                page: $scope.currentPage
              });
            }
            if (data.diagnoses.dataUpdate !== null) {
              $uibModalInstance.close(diagnosis);
              $state.go('diagnoses-detail', {
                patientId: $scope.patient.id,
                filter: $scope.query,
                page: $scope.currentPage
              });
            }
          };

          if (modal.title === 'Edit Problem / Diagnosis') {
            $scope.isEdit = true;
            $scope.diagnosis.dateSubmitted = new Date();
            $scope.diagnosis.dateOfOnset = new Date($scope.diagnosis.dateOfOnset);
          }else {
            $scope.isEdit = false;
            $scope.diagnosis.dateSubmitted = new Date();
            $scope.diagnosis.code = '12393890';
          }

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
          
          $scope.openDatepicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };
          
          $scope.ok = function (diagnosisForm, diagnosis) {
            $scope.formSubmitted = true;
            let toAdd = {
              code: $scope.diagnosis.code,
              dateOfOnset: $scope.diagnosis.dateOfOnset.toISOString().slice(0, 10),
              description: $scope.diagnosis.description,
              problem: $scope.diagnosis.problem,
              source: $scope.diagnosis.source,
              sourceId: '',
              terminology: $scope.diagnosis.terminology
            };

            if (diagnosisForm.$valid) {
              
              if ($scope.isEdit) {
                
                $scope.diagnosesUpdate($scope.patient.id, toAdd);
                
              } else {
                
                $scope.diagnosesCreate($scope.patient.id, toAdd);
                
              }
              
            }
          };

          $scope.cancel = function () {
            $scope.diagnosis = angular.copy(diagnosis);
            $uibModalInstance.dismiss('cancel');
          };

          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: setCurrentPageData(state)
          }))(this);

          $scope.$on('$destroy', unsubscribe);

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