'use strict';
import ContactsDetailComponent from '../../../../app/rippleui/pages/contacts/contacts-detail.component.js';
import '../../../../app/index';

describe('Contacts Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, contactsActions, ContactsModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _contactsActions_, _ContactsModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    contactsActions = _contactsActions_;
    ContactsModal = _ContactsModal_;
    usSpinnerService = _usSpinnerService_;

    template = ContactsDetailComponent.template;
    ctrl = controller(ContactsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      contactsActions: contactsActions,
      ContactsModal: ContactsModal,
      usSpinnerService: usSpinnerService
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});