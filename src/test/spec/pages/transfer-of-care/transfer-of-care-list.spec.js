'use strict';
import TransferOfCareListComponent from '../../../../app/rippleui/pages/transfer-of-care/transfer-of-care-list.component.js';
import '../../../../app/index';

describe('TransferOfCare List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, transferOfCareActions, serviceRequests, TransferOfCareModal, usSpinnerService;

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
    // scope.$digest();
  }));

  it('Query', function() {
    expect(ctrl.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});