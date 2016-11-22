'use strict';
import ProceduresModal from '../../../../app/rippleui/pages/procedures/procedures-modal';
import '../../../../app/index';

describe('Procedures Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, proceduresActions, ngRedux, stateParams;

  beforeEach(inject(($injector, $controller, _$uibModal_, _proceduresActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('ProceduresModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    proceduresActions = _proceduresActions_;
  }));

  it('Procedures Modal component exist', function() {
    expect(ProceduresModal).toBeDefined();
  });
});