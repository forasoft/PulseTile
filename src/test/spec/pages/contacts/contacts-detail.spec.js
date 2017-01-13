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

  beforeEach(function() {
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'contactsLoad');

    ctrl.edit();
    ctrl.setCurrentPageData();
    ctrl.contactsLoad();
  });

  it('Modal exist', function() {
    expect(ContactsModal).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it("edit was called", function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("contactsLoad was called", function() {
    expect(ctrl.contactsLoad).toHaveBeenCalled();
  });
});