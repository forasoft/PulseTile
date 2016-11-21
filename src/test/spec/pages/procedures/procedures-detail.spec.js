'use strict';
import ProceduresDetailComponent from '../../../../app/rippleui/pages/procedures/procedures-detail.component.js';
import '../../../../app/index';

describe('Procedures Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, proceduresActions, ProceduresModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _proceduresActions_, _ProceduresModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    proceduresActions = _proceduresActions_;
    ProceduresModal = _ProceduresModal_;
    usSpinnerService = _usSpinnerService_;

    template = ProceduresDetailComponent.template;
    ctrl = controller(ProceduresDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      proceduresActions: proceduresActions,
      ProceduresModal: ProceduresModal,
      usSpinnerService: usSpinnerService
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});