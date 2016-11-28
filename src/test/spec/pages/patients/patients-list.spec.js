'use strict';
import PatientsComponent from '../../../../app/rippleui/pages/patients-list/patients.component';
import '../../../../app/index';
import '../../../../app/actions/index';
import * as types from '../../../../app/constants/ActionTypes';
import patients from '../../../../app/rippleui/pages/patients-list/patients-reducer-all';

describe('Patients List', function() {

  beforeEach(angular.mock.module('ripple-ui'));
  beforeEach(angular.mock.module('app.actions'));

  let scope, 
    ctrl, 
    controller, 
    template, 
    state,
    stateParams,
    location,
    ngRedux, 
    patientsActions, 
    serviceRequests, 
    Patient, 
    actions,
    fakeCall;
  
  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$location_, _$ngRedux_, _patientsActions_, _serviceRequests_, _Patient_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    patientsActions = _patientsActions_;
    location = _$location_;
    serviceRequests = _serviceRequests_;
    Patient = _Patient_;

    template = PatientsComponent.template;
    // ctrl = controller(PatientsComponent.controller, {
    //   $scope: scope,
    //   $state: state,
    //   $stateParams: stateParams,
    //   $location: location,
    //   $ngRedux: ngRedux,
    //   patientsActions: patientsActions,
    //   serviceRequests: serviceRequests,
    //   Patient: Patient
    // });

    actions = $injector.get('patientsActions');
  }));

  // beforeEach(function() {
  //   fakeCall = {
  //     callPatients: patients
  //   };
  //
  //   spyOn(fakeCall, 'callPatients');
  //
  //   fakeCall.callPatients({}, types.PATIENTS);
  //
  // });

  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  // it('Controller exist', function() {
  //   console.log('ctrl ---> ', ctrl);
  //   expect(ctrl).toBeDefined();
  // });
  it('Include patientsActions in index actions file', function() {
    expect(actions).toBeDefined();
  });
  // it("Patients reducer was called", function() {
  //   expect(fakeCall.callPatients).toHaveBeenCalled();
  // });
});