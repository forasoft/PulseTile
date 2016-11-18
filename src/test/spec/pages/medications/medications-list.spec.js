'use strict';
import MedicationsListComponent from '../../../../app/rippleui/pages/medications/medications-list.component.js';
import '../../../../app/index';

describe('Medications List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, medicationsActions, serviceRequests, MedicationsModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _medicationsActions_, _serviceRequests_, _MedicationsModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    medicationsActions = _medicationsActions_;
    MedicationsModal = _MedicationsModal_;
    usSpinnerService = _usSpinnerService_;

    template = MedicationsListComponent.template;

    ctrl = controller(MedicationsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      medicationsActions: medicationsActions,
      serviceRequests: serviceRequests,
      MedicationsModal: MedicationsModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('currentPage', function() {
    expect(ctrl.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});