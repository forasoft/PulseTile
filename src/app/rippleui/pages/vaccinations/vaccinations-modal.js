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
export default function VaccinationsModal($uibModal, vaccinationsActions, $stateParams, $ngRedux) {
  var isModalClosed = true;
 
  var openModal = function (patient, modal, vaccination, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./vaccinations-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          var updated = false;
          $scope.patient = patient;

          var updateId = function (sourceId) {
            var sourceArr = sourceId.split('::');
            var newVersionNumber = parseInt(sourceArr[2]) + 1;
            var newId = sourceArr[0] + '::' + sourceArr[1] + '::' + newVersionNumber;
            return newId;
          };

          var setCurrentPageData = function (data) {
            // if (data.vaccinations.dataCreate !== null) {
            //   $uibModalInstance.close(vaccination);
            //   $state.go('vaccinations', {
            //     patientId: $scope.patient.id,
            //     filter: $scope.currentUser.query.$ || '',
            //     page: $scope.currentUser.currentPage,
            //     reportType: $stateParams.reportType,
            //     searchString: $stateParams.searchString,
            //     queryType: $stateParams.queryType
            //   });
            // }
            // if (data.vaccinations.dataUpdate !== null) {
            //   $uibModalInstance.close(vaccination);
            //   $state.go('vaccinations-detail', {
            //     patientId: $scope.patient.id,
            //     vaccinationIndex: updateId(vaccination.sourceId),
            //     page: $scope.currentPage,
            //     reportType: $stateParams.reportType,
            //     searchString: $stateParams.searchString,
            //     queryType: $stateParams.queryType
            //   });
            // }
          };

          $scope.currentUser = currentUser;
          $scope.vaccination = angular.copy(vaccination);
          $scope.patient = patient;
          $scope.modal = modal;

          if (modal.title === 'Create Vaccination') {
            $scope.isEdit = false;
            $scope.vaccination.dateSubmitted = new Date();
            // $scope.vaccination.dateSubmitted = new Date().toISOString().slice(0, 10);
            $scope.vaccination.relationshipCode = 'at0039';
            $scope.vaccination.relationshipTerminology = 'local';
          }
          else {
            $scope.isEdit = true;
            $scope.vaccination.dateSubmitted = new Date();
            // $scope.vaccination.dateSubmitted = new Date().toISOString().slice(0, 10);
          }
          
          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };
          
          $scope.ok = function (vaccinationForm, vaccination) {
            $scope.formSubmitted = true;
            if (vaccinationForm.$valid) {
              if ($scope.isEdit) {
                $scope.vaccinationsUpdate($scope.patient.id, $scope.vaccination);
              } else {
                $scope.vaccinationsCreate($scope.patient.id, $scope.vaccination);
              }
            }
          };

          $scope.cancel = function () {
            $scope.vaccination = angular.copy(vaccination);
            $uibModalInstance.dismiss('cancel');
          };


          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: setCurrentPageData(state)
          }))(this);
          
          $scope.$on('$destroy', unsubscribe);

          $scope.vaccinationsCreate = vaccinationsActions.create;
          $scope.vaccinationsUpdate = vaccinationsActions.update;
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
VaccinationsModal.$inject = ['$uibModal', 'vaccinationsActions', '$stateParams', '$ngRedux'];