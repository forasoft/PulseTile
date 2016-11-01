let templateContactsDetail= require('./contacts-detail.html');

class ContactsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, patientsActions, contactsActions, ContactsModal, usSpinnerService) {
    this.edit = function () {
      ContactsModal.openModal(this.currentPatient, {title: 'Edit Contact'}, this.contact, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.contactsGet.data) {
        this.contact = data.contactsGet.data;
        usSpinnerService.stop('contactDetail-spinner');
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.contactsLoad = contactsActions.get;
    this.contactsLoad($stateParams.patientId, $stateParams.contactIndex);
  }
}

const ContactsDetailComponent = {
  template: templateContactsDetail,
  controller: ContactsDetailController
};

ContactsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'patientsActions', 'contactsActions', 'ContactsModal', 'usSpinnerService'];
export default ContactsDetailComponent;