'use strict';
import ResultsListComponent from '../../../../app/rippleui/pages/results/results-list.component.js';
import '../../../../app/index';

describe('Results List', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  // $scope, $state, $stateParams, $ngRedux, resultsActions, serviceRequests, usSpinnerService

  let scope, ctrl, controller, template, stateParams, state, ngRedux, resultsActions, serviceRequests, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _resultsActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    resultsActions = _resultsActions_;
    usSpinnerService = _usSpinnerService_;

    template = ResultsListComponent.template;

    ctrl = controller(ResultsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      resultsActions: resultsActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('Query', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});