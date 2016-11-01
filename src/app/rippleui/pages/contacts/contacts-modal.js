export default function ContactsModal($uibModal, contactsActions, $stateParams) {
  var isModalClosed = true;
 
  var openModal = function (patient, modal, contact, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./contacts-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          var updateId = function (sourceId) {
            var sourceArr = sourceId.split('::');
            var newVersionNumber = parseInt(sourceArr[2]) + 1;
            var newId = sourceArr[0] + '::' + sourceArr[1] + '::' + newVersionNumber;
            return newId;
          };

          $scope.currentUser = currentUser;
          $scope.contact = contact;
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
              
              $uibModalInstance.close(contact);

              if ($scope.isEdit) {
                $scope.contactsUpdate($scope.patient.id, $scope.contact);
                $state.go('contacts-detail', {
                  patientId: $scope.patient.id,
                  contactIndex: updateId(contact.sourceId),
                  page: $scope.currentPage,
                  reportType: $stateParams.reportType,
                  searchString: $stateParams.searchString,
                  queryType: $stateParams.queryType
                });
              } else {
                $scope.contactsCreate($scope.patient.id, $scope.contact);
                $state.go('contacts', {
                  patientId: $scope.patient.id,
                  filter: $scope.currentUser.query.$,
                  page: $scope.currentUser.currentPage,
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
ContactsModal.$inject = ['$uibModal', 'contactsActions', '$stateParams'];