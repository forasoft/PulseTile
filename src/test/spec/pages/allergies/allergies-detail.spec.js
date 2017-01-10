'use strict';
import AllergiesDetailComponent from '../../../../app/rippleui/pages/allergies/allergies-detail.component.js';
import '../../../../app/index';

describe('Allergies Detail', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, allergiesActions, AllergiesModal, usSpinnerService, element;

  beforeEach(inject(($injector, $controller, $compile, _$state_, _$stateParams_, _$ngRedux_, _allergiesActions_, _AllergiesModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    allergiesActions = _allergiesActions_;
    AllergiesModal = _AllergiesModal_;
    usSpinnerService = _usSpinnerService_;

    element = angular.element('<allergies-detail-component></allergies-detail-component>');
    element = $compile(element)(scope);

    template = AllergiesDetailComponent.template;
    ctrl = controller(AllergiesDetailComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      allergiesActions: allergiesActions,
      AllergiesModal: AllergiesModal,
      usSpinnerService: usSpinnerService
    });
  }));

  beforeEach(function() {
    spyOn(ctrl, 'edit');
    spyOn(ctrl, 'allergiesLoad');
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(allergiesActions, 'all');
    spyOn(allergiesActions, 'get');
    spyOn(allergiesActions, 'create');
    spyOn(allergiesActions, 'update');

    ctrl.edit();
    ctrl.allergiesLoad();
    ctrl.setCurrentPageData();
    allergiesActions.all();
    allergiesActions.get();
    allergiesActions.create();
    allergiesActions.update();
  });

  it('Template element exist', function() {
    expect(element).toBeDefined();
  });
  it('should render a strong', function() {
    var strong = element.find('strong');
    expect(strong.text()).toBe('Allergy');
  });
  it('spinner, label exist', function() {
    var spinner = element.find('.patientSummary-spinner');
    var label = element.find('label');
    expect(label).toBeDefined();
    expect(spinner).toBeDefined();
  });  
  it("allergiesActions methods was called", function() {
    expect(allergiesActions.all).toHaveBeenCalled();
    expect(allergiesActions.get).toHaveBeenCalled();
    expect(allergiesActions.create).toHaveBeenCalled();
    expect(allergiesActions.update).toHaveBeenCalled();
  });
  it('formDisabled', function() {
    expect(scope.formDisabled).toBe(true);
  });
  it('UnlockedSources', function() {
    expect(scope.UnlockedSources[0]).toBe('handi.ehrscape.com');
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it("edit was called", function() {
    expect(ctrl.edit).toHaveBeenCalled();
  });
  it("allergiesLoad was called", function() {
    expect(ctrl.allergiesLoad).toHaveBeenCalled();
  });
  it("setCurrentPageData was called", function() {
    expect(ctrl.setCurrentPageData).toHaveBeenCalled();
  });
});