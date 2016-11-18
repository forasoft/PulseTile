'use strict';
import MedicationsDetailComponent from '../../../../app/rippleui/pages/medications/medications-detail.component.js';
import '../../../../app/index';

describe('Medications Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, medicationsActions, MedicationsModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _medicationsActions_, _MedicationsModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    medicationsActions = _medicationsActions_;
    MedicationsModal = _MedicationsModal_;
    usSpinnerService = _usSpinnerService_;

    template = MedicationsDetailComponent.template;
    ctrl = controller(MedicationsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      medicationsActions: medicationsActions,
      MedicationsModal: MedicationsModal,
      usSpinnerService: usSpinnerService
    });
  }));

  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('UnlockedSources', function() {
    expect(scope.UnlockedSources[0]).toBe('handi.ehrscape.com');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});