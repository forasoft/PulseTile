'use strict';
import DiagnosesListComponent from '../../../../app/rippleui/pages/diagnoses/diagnoses-list.component.js';
import '../../../../app/index';

describe('Diagnoses List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, diagnosesActions, serviceRequests, DiagnosesModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _diagnosesActions_, _serviceRequests_, _DiagnosesModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    diagnosesActions = _diagnosesActions_;
    DiagnosesModal = _DiagnosesModal_;
    usSpinnerService = _usSpinnerService_;

    template = DiagnosesListComponent.template;

    ctrl = controller(DiagnosesListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      diagnosesActions: diagnosesActions,
      serviceRequests: serviceRequests,
      DiagnosesModal: DiagnosesModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('Query is empty', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});