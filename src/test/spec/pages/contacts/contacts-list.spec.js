'use strict';
import ContactsListComponent from '../../../../app/rippleui/pages/contacts/contacts-list.component.js';
import '../../../../app/index';

describe('Contacts List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, contactsActions, serviceRequests, ContactsModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _contactsActions_, _serviceRequests_, _ContactsModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    contactsActions = _contactsActions_;
    ContactsModal = _ContactsModal_;
    usSpinnerService = _usSpinnerService_;

    template = ContactsListComponent.template;

    ctrl = controller(ContactsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      contactsActions: contactsActions,
      serviceRequests: serviceRequests,
      ContactsModal: ContactsModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('Query is empty', function() {
    expect(ctrl.query).toEqual({});
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});