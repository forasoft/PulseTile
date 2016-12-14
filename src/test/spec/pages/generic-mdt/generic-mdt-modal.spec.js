'use strict';
import '../../../../app/index';

describe('GenericMdt Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, genericmdtActions, ngRedux, stateParams, GenericMdtModal;

  beforeEach(inject(($injector, $controller, _$uibModal_, _genericmdtActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('GenericMdtModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    genericmdtActions = _genericmdtActions_;
    GenericMdtModal = scope;

    spyOn(GenericMdtModal, 'openModal');

    GenericMdtModal.openModal();
  }));

  it('GenericMdt Modal component exist', function() {
    expect(GenericMdtModal).toBeDefined();
  });
  it("openModal was called", function() {
    expect(GenericMdtModal.openModal).toHaveBeenCalled();
  });
});