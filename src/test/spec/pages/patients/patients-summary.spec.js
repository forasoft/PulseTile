'use strict';
import PatientsSummaryComponent from '../../../../app/rippleui/pages/patient-summary/patients-summary.component';
import '../../../../app/index';

describe('Patients Summary', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, state, stateParams, ngRedux, location, patientsActions, serviceRequests, usSpinnerService;
  
  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _$location_, _patientsActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    patientsActions = _patientsActions_;
    location = _$location_;
    serviceRequests = _serviceRequests_;
    usSpinnerService = _usSpinnerService_;

    template = PatientsSummaryComponent.template;
    ctrl = controller(PatientsSummaryComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      $location: location,
      patientsActions: patientsActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});