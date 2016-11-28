'use strict';
import ContactsListComponent from '../../../../app/rippleui/pages/contacts/contacts-list.component.js';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import contacts from '../../../../app/rippleui/pages/contacts/contacts-reducer-all.js';

describe('Contacts List', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  beforeEach(angular.mock.module('app.actions'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux, 
    contactsActions, 
    serviceRequests, 
    ContactsModal, 
    usSpinnerService,
    actions,
    fakeCall;

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
    actions = $injector.get('contactsActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callContacts: contacts
    };

    spyOn(fakeCall, 'callContacts');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'contactsLoad');

    fakeCall.callContacts({}, types.CONTACTS);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.contactsLoad();
  });

  it('Query is empty', function() {
    expect(ctrl.query).toEqual({});
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include contactsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Contacts reducer was called", function() {
    expect(fakeCall.callContacts).toHaveBeenCalled();
  });
  it("pageChangeHandler was called", function() {
    expect(ctrl.pageChangeHandler).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("selected was called", function() {
    expect(ctrl.selected).toHaveBeenCalled();
  });
  it("create was called", function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("contactsLoad was called", function() {
    expect(ctrl.contactsLoad).toHaveBeenCalled();
  });
});