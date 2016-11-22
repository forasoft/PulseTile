'use strict';
import TransferOfCareDetailComponent from '../../../../app/rippleui/pages/transfer-of-care/transfer-of-care-detail.component.js';
import '../../../../app/index';

describe('TransferOfCare Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, transferOfCareActions, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _transferOfCareActions_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    transferOfCareActions = _transferOfCareActions_;
    usSpinnerService = _usSpinnerService_;

    template = TransferOfCareDetailComponent.template;
    ctrl = controller(TransferOfCareDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      transferOfCareActions: transferOfCareActions,
      usSpinnerService: usSpinnerService
    });
  }));

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});