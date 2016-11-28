'use strict';
import '../../../../app/index';

describe('Medications Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, medicationsActions, ngRedux, stateParams, MedicationsModal;

  beforeEach(inject(($injector, $controller, _$uibModal_, _medicationsActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('MedicationsModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    medicationsActions = _medicationsActions_;
  }));

  beforeEach(function() {
    MedicationsModal = scope;
    
    spyOn(MedicationsModal, 'openModal');

    MedicationsModal.openModal();
  });

  it('Medications Modal component exist', function() {
    expect(scope).toBeDefined();
  });
  it('openModal was called', function() {
    expect(MedicationsModal.openModal).toHaveBeenCalled();
  });

});