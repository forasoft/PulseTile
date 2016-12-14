'use strict';
import TransferOfCareListComponent from '../../../../app/rippleui/pages/transfer-of-care/transfer-of-care-list.component.js';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import transferOfCare from '../../../../app/rippleui/pages/transfer-of-care/transfer-of-care-reducer-all.js';
import '../../../../app/index';

describe('TransferOfCare List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, actions, stateParams, state, ngRedux, transferOfCareActions, serviceRequests, TransferOfCareModal, usSpinnerService, fakeCall;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _transferOfCareActions_, _serviceRequests_, _TransferOfCareModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    transferOfCareActions = _transferOfCareActions_;
    TransferOfCareModal = _TransferOfCareModal_;
    usSpinnerService = _usSpinnerService_;

    template = TransferOfCareListComponent.template;

    ctrl = controller(TransferOfCareListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      transferOfCareActions: transferOfCareActions,
      serviceRequests: serviceRequests,
      TransferOfCareModal: TransferOfCareModal,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('transferOfCareActions');
    // scope.$digest();
  }));
  beforeEach(function() {
    fakeCall = {
      callTransferOfCare: transferOfCare
    };

    spyOn(fakeCall, 'callTransferOfCare');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');

    fakeCall.callTransferOfCare({}, types.TRANSFEROFCARE);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.create();
    ctrl.setCurrentPageData();
  });

  it('Query', function() {
    expect(ctrl.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include TransferOfCareActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("TransferOfCare reducer was called", function() {
    expect(fakeCall.callTransferOfCare).toHaveBeenCalled();
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
});