'use strict';
import TransferOfCareModal from '../../../../app/rippleui/pages/transfer-of-care/transfer-of-care-modal';
import '../../../../app/index';

describe('TransferOfCare Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, transferOfCareActions, ngRedux, stateParams;

  beforeEach(inject(($injector, $controller, _$uibModal_, _transferOfCareActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('TransferOfCareModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    transferOfCareActions = _transferOfCareActions_;
  }));

  it('TransferOfCare Modal component exist', function() {
    expect(TransferOfCareModal).toBeDefined();
  });
});