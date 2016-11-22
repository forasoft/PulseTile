'use strict';
import MedicationsModal from '../../../../app/rippleui/pages/medications/medications-modal';
import '../../../../app/index';

describe('Medications Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, medicationsActions, ngRedux, stateParams;

  beforeEach(inject(($injector, $controller, _$uibModal_, _medicationsActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('MedicationsModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    medicationsActions = _medicationsActions_;
  }));

  it('Medications Modal component exist', function() {
    expect(MedicationsModal).toBeDefined();
  });
});