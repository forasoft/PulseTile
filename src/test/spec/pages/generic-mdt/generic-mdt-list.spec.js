'use strict';
import GenericMdtListComponent from '../../../../app/rippleui/pages/generic-mdt/generic-mdt-list.component.js';
import '../../../../app/index';

describe('GenericMdt List', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  let scope, ctrl, controller, template, stateParams, state, ngRedux, genericmdtActions, serviceRequests, GenericMdtModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _genericmdtActions_, _serviceRequests_, _GenericMdtModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    genericmdtActions = _genericmdtActions_;
    GenericMdtModal = _GenericMdtModal_;
    usSpinnerService = _usSpinnerService_;

    template = GenericMdtListComponent.template;

    ctrl = controller(GenericMdtListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      genericmdtActions: genericmdtActions,
      serviceRequests: serviceRequests,
      GenericMdtModal: GenericMdtModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});