'use strict';
import ContactsModal from '../../../../app/rippleui/pages/contacts/contacts-modal';
import '../../../../app/index';

describe('Contacts Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, contactsActions, ngRedux, stateParams;

  beforeEach(inject(($injector, $controller, _$uibModal_, _contactsActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('ContactsModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    contactsActions = _contactsActions_;
  }));

  it('Contacts Modal component exist', function() {
    expect(ContactsModal).toBeDefined();
  });
});