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
let templateContactsDetail= require('./contacts-detail.html');

class ContactsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, contactsActions, ContactsModal, usSpinnerService, serviceRequests) {
    this.edit = function () {
      ContactsModal.openModal(this.currentPatient, {title: 'Edit Contact'}, this.contact, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.contacts.dataGet) {
        this.contact = data.contacts.dataGet;
        usSpinnerService.stop('contactDetail-spinner');
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
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

ContactsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'contactsActions', 'ContactsModal', 'usSpinnerService', 'serviceRequests'];
export default ContactsDetailComponent;