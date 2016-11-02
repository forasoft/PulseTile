export default function ContactsModal($uibModal, contactsActions, $stateParams, $ngRedux) {
  var isModalClosed = true;
 
  var openModal = function (patient, modal, contact, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./contacts-modal.html'),
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
            if (data.contacts.dataCreate != null) {
              $uibModalInstance.close(contact);
              $state.go('contacts', {
                patientId: $scope.patient.id,
                filter: $scope.currentUser.query.$ || '',
                page: $scope.currentUser.currentPage,
                reportType: $stateParams.reportType,
                searchString: $stateParams.searchString,
                queryType: $stateParams.queryType
              });
            }
            if (data.contacts.dataUpdate != null) {
              $uibModalInstance.close(contact);
              $state.go('contacts-detail', {
                patientId: $scope.patient.id,
                contactIndex: updateId(contact.sourceId),
                page: $scope.currentPage,
                reportType: $stateParams.reportType,
                searchString: $stateParams.searchString,
                queryType: $stateParams.queryType
              });
            }
          };

          $scope.currentUser = currentUser;
          $scope.contact = $scope.user = angular.copy(contact);
          $scope.patient = patient;
          $scope.modal = modal;

          if (modal.title === 'Create Contact') {
            $scope.isEdit = false;
            $scope.contact.dateSubmitted = new Date();
            // $scope.contact.dateSubmitted = new Date().toISOString().slice(0, 10);
            $scope.contact.relationshipCode = 'at0039';
            $scope.contact.relationshipTerminology = 'local';
          }
          else {
            $scope.isEdit = true;
            $scope.contact.dateSubmitted = new Date();
            // $scope.contact.dateSubmitted = new Date().toISOString().slice(0, 10);
          }
          
          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };
          
          $scope.ok = function (contactForm, contact) {
            $scope.formSubmitted = true;
            if (contactForm.$valid) {
              if ($scope.isEdit) {
                $scope.contactsUpdate($scope.patient.id, $scope.contact);
              } else {
                $scope.contactsCreate($scope.patient.id, $scope.contact);
              }
            }
          };

          $scope.cancel = function () {
            $scope.contact = angular.copy(contact);
            $uibModalInstance.dismiss('cancel');
          };


          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: setCurrentPageData(state)
          }))(this);
          
          $scope.$on('$destroy', unsubscribe);

          $scope.contactsCreate = contactsActions.create;
          $scope.contactsUpdate = contactsActions.update;
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
ContactsModal.$inject = ['$uibModal', 'contactsActions', '$stateParams', '$ngRedux'];