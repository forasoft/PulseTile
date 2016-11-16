'use strict';
import ClinicalnotesDetailComponent from '../../../../app/rippleui/pages/clinical-notes/clinicalnotes-detail.component.js';
import '../../../../app/index';

describe('Clinicalnotes Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, clinicalnotesActions, ClinicalnotesModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _clinicalnotesActions_, _ClinicalnotesModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    clinicalnotesActions = _clinicalnotesActions_;
    ClinicalnotesModal = _ClinicalnotesModal_;
    usSpinnerService = _usSpinnerService_;

    template = ClinicalnotesDetailComponent.template;
    ctrl = controller(ClinicalnotesDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      clinicalnotesActions: clinicalnotesActions,
      ClinicalnotesModal: ClinicalnotesModal,
      usSpinnerService: usSpinnerService
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});