'use strict';
import AllergiesModal from '../../../../app/rippleui/pages/allergies/allergies-modal';
import '../../../../app/index';

describe('Allergies Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, allergiesActions, ngRedux, stateParams;

  beforeEach(inject(($injector, $controller, _$uibModal_, _allergiesActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('AllergiesModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    allergiesActions = _allergiesActions_;
  }));

  it('Allergies Modal component exist', function() {
    expect(AllergiesModal).toBeDefined();
  });
});