'use strict';
import ReferralsModal from '../../../../app/rippleui/pages/referrals/referrals-modal';
import '../../../../app/index';

describe('Referrals Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, referralsActions, ngRedux, stateParams;

  beforeEach(inject(($injector, $controller, _$uibModal_, _referralsActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('ReferralsModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    referralsActions = _referralsActions_;
  }));

  it('Referrals Modal component exist', function() {
    expect(ReferralsModal).toBeDefined();
  });
});