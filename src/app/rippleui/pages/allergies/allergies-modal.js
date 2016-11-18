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
export default function AllergiesModal($uibModal, allergiesActions, $ngRedux, $stateParams) {
  var isModalClosed = true;

  var openModal = function (patient, modal, allergy, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./allergies-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          var setCurrentPageData = function (data) {
            if (data.allergies.dataCreate !== null) {
              $uibModalInstance.close(allergy);
              $scope.allergiesLoad($stateParams.patientId);
              $state.go('allergies', {
                patientId: $scope.patient.id,
                filter: $scope.query,
                page: $scope.currentPage
              });
            }

            if (data.allergies.dataUpdate !== null) {
              $uibModalInstance.close(allergy);
              $scope.allergiesLoad($stateParams.patientId);
              $state.go('allergies-details', {
                patientId: $scope.patient.id,
                filter: $scope.query,
                page: $scope.currentPage
              });
            }
          };

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
              if ($scope.isEdit) {
                $scope.allergiesUpdate($scope.patient.id, toAdd);
              } else {
                $scope.allergiesCreate($scope.patient.id, toAdd);
              }

            }
          };

          $scope.cancel = function () {
            $scope.allergy = angular.copy(allergy);
            $uibModalInstance.dismiss('cancel');
          };

          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: setCurrentPageData(state)
          }))(this);
          
          $scope.$on('$destroy', unsubscribe);

          $scope.allergiesCreate = allergiesActions.create;
          $scope.allergiesUpdate = allergiesActions.update;
          $scope.allergiesLoad = allergiesActions.all;
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
AllergiesModal.$inject = ['$uibModal', 'allergiesActions', '$ngRedux', '$stateParams'];