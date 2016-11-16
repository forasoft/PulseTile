'use strict';
import AppointmentsListComponent from '../../../app/rippleui/pages/appointments/appointments-list.component.js';
import '../../../app/index';

describe('Allergies Module', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, appointmentsActions, serviceRequests, AppointmentsModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _appointmentsActions_, _serviceRequests_, _AppointmentsModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    appointmentsActions = _appointmentsActions_;
    AppointmentsModal = _AppointmentsModal_;
    usSpinnerService = _usSpinnerService_;

    template = AppointmentsListComponent.template;

    ctrl = controller(AppointmentsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      appointmentsActions: appointmentsActions,
      serviceRequests: serviceRequests,
      AppointmentsModal: AppointmentsModal,
      usSpinnerService: usSpinnerService
    });
  }));

  it('query', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});