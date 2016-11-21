'use strict';
import ReferralsListComponent from '../../../../app/rippleui/pages/referrals/referrals-list.component.js';
import '../../../../app/index';

describe('Referrals List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, referralsActions, serviceRequests, ReferralsModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _referralsActions_, _serviceRequests_, _ReferralsModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    referralsActions = _referralsActions_;
    ReferralsModal = _ReferralsModal_;
    usSpinnerService = _usSpinnerService_;

    template = ReferralsListComponent.template;

    ctrl = controller(ReferralsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      referralsActions: referralsActions,
      serviceRequests: serviceRequests,
      ReferralsModal: ReferralsModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('currentPage', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});