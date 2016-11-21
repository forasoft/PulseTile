'use strict';
import ProceduresListComponent from '../../../../app/rippleui/pages/procedures/procedures-list.component.js';
import '../../../../app/index';

describe('Procedures List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, proceduresActions, serviceRequests, ProceduresModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _proceduresActions_, _serviceRequests_, _ProceduresModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    proceduresActions = _proceduresActions_;
    ProceduresModal = _ProceduresModal_;
    usSpinnerService = _usSpinnerService_;

    template = ProceduresListComponent.template;

    ctrl = controller(ProceduresListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      proceduresActions: proceduresActions,
      serviceRequests: serviceRequests,
      ProceduresModal: ProceduresModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('currentPage', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});