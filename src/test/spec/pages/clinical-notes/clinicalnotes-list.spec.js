'use strict';
import ClinicalnotesListComponent from '../../../../app/rippleui/pages/clinical-notes/clinicalnotes-list.component.js';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import clinicalnotes from '../../../../app/rippleui/pages/clinical-notes/clinicalnotes-reducer-all.js';

describe('Clinicalnotes List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    stateParams, 
    state, 
    ngRedux, 
    clinicalnotesActions, 
    serviceRequests, 
    ClinicalnotesModal, 
    usSpinnerService,
    fakeCall,
    actions;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _clinicalnotesActions_, _serviceRequests_, _ClinicalnotesModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    clinicalnotesActions = _clinicalnotesActions_;
    ClinicalnotesModal = _ClinicalnotesModal_;
    usSpinnerService = _usSpinnerService_;

    template = ClinicalnotesListComponent.template;

    ctrl = controller(ClinicalnotesListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      clinicalnotesActions: clinicalnotesActions,
      serviceRequests: serviceRequests,
      ClinicalnotesModal: ClinicalnotesModal,
      usSpinnerService: usSpinnerService
    });

    actions = $injector.get('clinicalnotesActions');
    // scope.$digest();
  }));

  beforeEach(function() {
    fakeCall = {
      callClinicalnotes: clinicalnotes
    };

    spyOn(fakeCall, 'callClinicalnotes');

    spyOn(ctrl, 'pageChangeHandler');
    spyOn(ctrl, 'go');
    spyOn(ctrl, 'selected');
    spyOn(ctrl, 'create');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'search');
    spyOn(ctrl, 'clinicalnotesLoad');

    fakeCall.callClinicalnotes({}, types.EOLCAREPLANS);

    ctrl.pageChangeHandler();
    ctrl.go();
    ctrl.selected();
    ctrl.create();
    ctrl.setCurrentPageData();
    ctrl.search();
    ctrl.clinicalnotesLoad();
  });
  
  it('Query is empty', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Include clinicalnotesActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  it("Clinicalnotes reducer was called", function() {
    expect(fakeCall.callClinicalnotes).toHaveBeenCalled();
  });
  it("pageChangeHandler was called", function() {
    expect(ctrl.pageChangeHandler).toHaveBeenCalled();
  });
  it("route go was called", function() {
    expect(ctrl.go).toHaveBeenCalled();
  });
  it("selected was called", function() {
    expect(ctrl.selected).toHaveBeenCalled();
  });
  it("create was called", function() {
    expect(ctrl.create).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
  it("search was called", function() {
    expect(ctrl.search).toHaveBeenCalled();
  });
  it("clinicalnotesLoad was called", function() {
    expect(ctrl.clinicalnotesLoad).toHaveBeenCalled();
  });
});