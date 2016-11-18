'use strict';
import HeightAndWeightListComponent from '../../../../app/rippleui/pages/height-and-weight/heightAndWeight-list.component.js';
import '../../../../app/index';

describe('HeightAndWeight List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, heightAndWeightActions, serviceRequests, HeightAndWeightModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _heightAndWeightActions_, _serviceRequests_, _HeightAndWeightModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    heightAndWeightActions = _heightAndWeightActions_;
    HeightAndWeightModal = _HeightAndWeightModal_;
    usSpinnerService = _usSpinnerService_;

    template = HeightAndWeightListComponent.template;

    ctrl = controller(HeightAndWeightListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      heightAndWeightActions: heightAndWeightActions,
      serviceRequests: serviceRequests,
      HeightAndWeightModal: HeightAndWeightModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('currentPage', function() {
    expect(ctrl.currentPage).toBe(1);
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});