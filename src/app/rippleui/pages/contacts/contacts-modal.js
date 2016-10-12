export default function ContactsModal($uibModal, contactsActions, $stateParams) {
  var isModalClosed = true;
 
  var openModal = function (patient, modal, contact, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./contacts-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.currentUser = currentUser;
          $scope.contact = contact;
          $scope.patient = patient;
          $scope.modal = modal;

          if (modal.title === 'Create Contact') {
            $scope.isEdit = false;
            $scope.contact.dateSubmitted = new Date().toISOString().slice(0, 10);
            $scope.contact.relationshipCode = 'at0039';
            $scope.contact.relationshipTerminology = 'local';
          }
          else {
            $scope.isEdit = true;
            $scope.contact.dateSubmitted = new Date().toISOString().slice(0, 10);
            // $scope.contact.dateSubmitted = new Date($scope.contact.dateSubmitted).toISOString().slice(0, 10);
          }
          
          $scope.openDatePicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };
          
          $scope.ok = function (contactForm, contact) {
            $scope.formSubmitted = true;

            let toAdd = {
              name: $scope.contact.name,
              relationship: $scope.contact.relationship,
              relationshipType: $scope.contact.relationshipType,
              contactInformation: $scope.contact.contactInformation,
              author: $scope.contact.author,
              nextOfKin: $scope.contact.nextOfKin,
              notes: $scope.contact.notes,
              dateSubmitted: $scope.contact.dateSubmitted
            };

            if (contactForm.$valid) {
              
              $uibModalInstance.close(contact);

              if ($scope.isEdit) {
                $scope.contactsUpdate($scope.patient.id, toAdd);
                $state.go('contacts-detail', {
                  patientId: $scope.patient.id,
                  contactIndex: contact.sourceId,
                  page: $scope.currentPage,
                  reportType: $stateParams.reportType,
                  searchString: $stateParams.searchString,
                  queryType: $stateParams.queryType
                });
              } else {
                $scope.contactsCreate($scope.patient.id, toAdd);
                $state.go('contacts-list', {
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