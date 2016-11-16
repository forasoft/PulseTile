'use strict';
import EolcareplansListComponent from '../../../../app/rippleui/pages/care-plans/eolcareplans-list.component';
import '../../../../app/index';

describe('Care Plans List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, eolcareplansActions, serviceRequests, EolcareplansModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _eolcareplansActions_, _serviceRequests_, _EolcareplansModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    eolcareplansActions = _eolcareplansActions_;
    EolcareplansModal = _EolcareplansModal_;
    usSpinnerService = _usSpinnerService_;

    template = EolcareplansListComponent.template;

    ctrl = controller(EolcareplansListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      eolcareplansActions: eolcareplansActions,
      serviceRequests: serviceRequests,
      EolcareplansModal: EolcareplansModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('Query is empty', function() {
    expect(ctrl.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});