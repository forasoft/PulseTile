'use strict';
import HeightAndWeightModal from '../../../../app/rippleui/pages/height-and-weight/heightAndWeight-modal';
import '../../../../app/index';

describe('HeightAndWeight Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, heightAndWeightActions, ngRedux, stateParams;

  beforeEach(inject(($injector, $controller, _$uibModal_, _heightAndWeightActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('HeightAndWeightModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    heightAndWeightActions = _heightAndWeightActions_;
  }));

  it('HeightAndWeight Modal component exist', function() {
    expect(HeightAndWeightModal).toBeDefined();
  });
});