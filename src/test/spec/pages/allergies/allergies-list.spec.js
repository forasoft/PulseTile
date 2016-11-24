'use strict';
import AllergiesListComponent from '../../../../app/rippleui/pages/allergies/allergies-list.component.js';
import '../../../../app/actions/index';
import '../../../../app/index';

describe('Allergies Module', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  beforeEach(angular.mock.module('app.actions'));

  let scope, 
      ctrl, 
      controller, 
      template, 
      stateParams, 
      state, 
      ngRedux, 
      allergiesActions, 
      serviceRequests, 
      AllergiesModal, 
      usSpinnerService,
      actions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _allergiesActions_, _serviceRequests_, _AllergiesModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    allergiesActions = _allergiesActions_;
    AllergiesModal = _AllergiesModal_;
    usSpinnerService = _usSpinnerService_;

    template = AllergiesListComponent.template;

    ctrl = controller(AllergiesListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      allergiesActions: allergiesActions,
      serviceRequests: serviceRequests,
      AllergiesModal: AllergiesModal,
      usSpinnerService: usSpinnerService
    });
    actions = $injector.get('allergiesActions');    
    // scope.$digest();
  }));

  it('Query is empty', function() {
    expect(ctrl.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Include allergiesActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
});