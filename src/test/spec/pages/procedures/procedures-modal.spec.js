'use strict';
import '../../../../app/index';

describe('Procedures Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, proceduresActions, ngRedux, stateParams, ProceduresModal;

  beforeEach(inject(($injector, $controller, _$uibModal_, _proceduresActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('ProceduresModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    proceduresActions = _proceduresActions_;
  }));

  beforeEach(function() {
    ProceduresModal = scope;
    
    spyOn(ProceduresModal, 'openModal');

    ProceduresModal.openModal();
  });

  it('Procedures Modal component exist', function() {
    expect(scope).toBeDefined();
  });
  it('openModal was called', function() {
    expect(ProceduresModal.openModal).toHaveBeenCalled();
  });
});