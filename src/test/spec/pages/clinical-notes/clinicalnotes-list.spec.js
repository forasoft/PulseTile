'use strict';
import ClinicalnotesListComponent from '../../../../app/rippleui/pages/clinical-notes/clinicalnotes-list.component.js';
import '../../../../app/index';

describe('Clinicalnotes List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, clinicalnotesActions, serviceRequests, ClinicalnotesModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _clinicalnotesActions_, _serviceRequests_, _ClinicalnotesModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    clinicalnotesActions = _clinicalnotesActions_;
    ClinicalnotesModal = _ClinicalnotesModal_;
    usSpinnerService = _usSpinnerService_;

    template = ClinicalnotesListComponent.template;

    ctrl = controller(ClinicalnotesListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      clinicalnotesActions: clinicalnotesActions,
      serviceRequests: serviceRequests,
      ClinicalnotesModal: ClinicalnotesModal,
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