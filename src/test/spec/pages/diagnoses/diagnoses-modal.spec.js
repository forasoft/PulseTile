'use strict';
import '../../../../app/index';

describe('Diagnoses Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, diagnosesActions, ngRedux, stateParams, DiagnosesModal;

  beforeEach(inject(($injector, $controller, _$uibModal_, _diagnosesActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('DiagnosesModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    diagnosesActions = _diagnosesActions_;
  }));

  beforeEach(function() {
    DiagnosesModal = scope;

    spyOn(DiagnosesModal, 'openModal');

    DiagnosesModal.openModal();
  });

  it('Diagnoses Modal component exist', function() {
    expect(DiagnosesModal).toBeDefined();
  });
  it('openModal was called', function() {
    expect(DiagnosesModal.openModal).toHaveBeenCalled();
  });
});