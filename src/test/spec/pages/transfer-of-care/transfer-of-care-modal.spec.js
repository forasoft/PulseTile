'use strict';
import '../../../../app/index';

describe('TransferOfCare Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, transferOfCareActions, ngRedux, stateParams, TransferOfCareModal;

  beforeEach(inject(($injector, $controller, _$uibModal_, _transferOfCareActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('TransferOfCareModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    transferOfCareActions = _transferOfCareActions_;
  }));

  beforeEach(function() {
    TransferOfCareModal = scope;
    
    spyOn(TransferOfCareModal, 'openModal');

    TransferOfCareModal.openModal();
  });

  it('TransferOfCare Modal component exist', function() {
    expect(scope).toBeDefined();
  });
  it('openModal was called', function() {
    expect(TransferOfCareModal.openModal).toHaveBeenCalled();
  });
});