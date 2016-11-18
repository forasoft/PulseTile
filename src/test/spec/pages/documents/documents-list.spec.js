'use strict';
import DocumentsListComponent from '../../../../app/rippleui/pages/documents/documents-list.component.js';
import '../../../../app/index';

describe('Documents List', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  // $scope, $state, $stateParams, $ngRedux, documentsActions, serviceRequests, usSpinnerService

  let scope, ctrl, controller, template, stateParams, state, ngRedux, documentsActions, serviceRequests, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _documentsActions_, _serviceRequests_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    documentsActions = _documentsActions_;
    usSpinnerService = _usSpinnerService_;

    template = DocumentsListComponent.template;

    ctrl = controller(DocumentsListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      documentsActions: documentsActions,
      serviceRequests: serviceRequests,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('Query is empty', function() {
    expect(ctrl.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});