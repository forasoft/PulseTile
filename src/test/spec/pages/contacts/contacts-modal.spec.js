'use strict';
import '../../../../app/index';

describe('Contacts Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, contactsActions, ngRedux, stateParams, ContactsModal;

  beforeEach(inject(($injector, $controller, _$uibModal_, _contactsActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('ContactsModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    contactsActions = _contactsActions_;
  }));

  beforeEach(function() {
    ContactsModal = scope;

    spyOn(ContactsModal, 'openModal');

    ContactsModal.openModal();
  });

  it('openModal was called', function() {
    expect(ContactsModal.openModal).toHaveBeenCalled();
  });

  it('ContactsModal Modal component exist', function() {
    expect(ContactsModal).toBeDefined();
  });
});