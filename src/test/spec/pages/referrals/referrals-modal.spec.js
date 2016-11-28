'use strict';
import '../../../../app/index';

describe('Referrals Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, referralsActions, ngRedux, stateParams, ReferralsModal;

  beforeEach(inject(($injector, $controller, _$uibModal_, _referralsActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('ReferralsModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    referralsActions = _referralsActions_;
  }));

  beforeEach(function() {
    ReferralsModal = scope;
    
    spyOn(ReferralsModal, 'openModal');

    ReferralsModal.openModal();
  });

  it('Referrals Modal component exist', function() {
    expect(scope).toBeDefined();
  });
  it('openModal was called', function() {
    expect(ReferralsModal.openModal).toHaveBeenCalled();
  });
});