'use strict';
import GenericMdtDetailComponent from '../../../../app/rippleui/pages/generic-mdt/generic-mdt-detail.component.js';
import '../../../../app/index';

describe('GenericMdt Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, genericmdtActions, GenericMdtModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _genericmdtActions_, _GenericMdtModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    genericmdtActions = _genericmdtActions_;
    GenericMdtModal = _GenericMdtModal_;
    usSpinnerService = _usSpinnerService_;

    template = GenericMdtDetailComponent.template;
    ctrl = controller(GenericMdtDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      genericmdtActions: genericmdtActions,
      GenericMdtModal: GenericMdtModal,
      usSpinnerService: usSpinnerService
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});