let templateContactsList = require('./contacts-list.html');

class ContactsListController {
  constructor($scope, $state, $stateParams, $ngRedux, contactsActions, serviceRequests, ContactsModal, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.query = {};
    this.queryBy = '$';
    this.currentPage = 1;

    this.create = function () {
      ContactsModal.openModal(this.currentPatient, {title: 'Create Contact'}, {}, this.currentUser);
    };

    this.go = function (id) {
      $state.go('contacts-detail', {
        patientId: $stateParams.patientId,
        contactIndex: id,
        filter: this.query.$,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    this.setCurrentPageData = function (data) {
      if (data.contacts.data) {
        this.contacts = data.contacts.data;
        usSpinnerService.stop('patientSummary-spinner');
      }
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    this.selected = function (contactIndex) {
      return contactIndex === $stateParams.contactIndex;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      this.query.$ = $stateParams.filter;
    }

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    this.contactsLoad = contactsActions.all;
    this.contactsLoad($stateParams.patientId);
  }
}

const ContactsListComponent = {
  template: templateContactsList,
  controller: ContactsListController
};

ContactsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'contactsActions', 'serviceRequests', 'ContactsModal', 'usSpinnerService'];
export default ContactsListComponent;