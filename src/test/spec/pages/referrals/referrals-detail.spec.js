'use strict';
import ReferralsDetailComponent from '../../../../app/rippleui/pages/referrals/referrals-detail.component.js';
import '../../../../app/index';

describe('Referrals Details', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, referralsActions, ReferralsModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _referralsActions_, _ReferralsModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    referralsActions = _referralsActions_;
    ReferralsModal = _ReferralsModal_;
    usSpinnerService = _usSpinnerService_;

    template = ReferralsDetailComponent.template;
    ctrl = controller(ReferralsDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      referralsActions: referralsActions,
      ReferralsModal: ReferralsModal,
      usSpinnerService: usSpinnerService
    });
  }));

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
});