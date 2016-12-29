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
    spyOn(ctrl, 'setCurrentPageData');
    spyOn(ctrl, 'allergiesLoad');

    ctrl.edit();
    ctrl.allergiesLoad();
    ctrl.setCurrentPageData();
  });

  it('should render a button', function() {
    var strong = element.find('strong');
    expect(strong.text()).toBe('Allergy');
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