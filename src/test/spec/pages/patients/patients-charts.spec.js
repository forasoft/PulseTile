'use strict';
import PatientsChartsComponent from '../../../../app/rippleui/pages/patients-charts/patients-charts.component';
import '../../../../app/index';

describe('Patients Charts', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, state, $window, patientsActions, ngRedux, uibModal, serviceRequests, $timeout, Patient;

  beforeEach(inject(($injector, $controller, _$state_, _$window_, _patientsActions_, _$ngRedux_,_$uibModal_, _serviceRequests_, _$timeout_, _Patient_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    $window = _$window_;
    patientsActions = _patientsActions_;
    uibModal = _$uibModal_;
    serviceRequests = _serviceRequests_;
    $timeout = _$timeout_;
    Patient = _Patient_;

    template = PatientsChartsComponent.template;
    ctrl = controller(PatientsChartsComponent.controller, {
      $scope: scope,
      $state: state,
      $window: $window,
      patientsActions: patientsActions,
      $ngRedux: ngRedux,
      $uibModal: uibModal,
      serviceRequests: serviceRequests,
      $timeout: $timeout,
      Patient: Patient
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});