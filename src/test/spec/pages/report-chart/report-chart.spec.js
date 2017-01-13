'use strict';
import ReportChartComponent from '../../../../app/rippleui/search/report-chart.component.js';
import '../../../../app/index';

describe('ReportChartComponent', function() {

    beforeEach(angular.mock.module('ripple-ui'));

    let scope, ctrl, controller, template, rootScope, $window, uibModal, state, stateParams, searchReport, $timeout, ngRedux, serviceRequests;

    beforeEach(inject(($injector, $controller, _$rootScope_, _$window_, _$uibModal_, _$state_, _$stateParams_, _searchReport_, _$timeout_, _$ngRedux_, _serviceRequests_) => {
        controller = $controller;
        scope = $injector.get('$rootScope').$new();
        state = _$state_;
        serviceRequests = _serviceRequests_;
        rootScope = _$rootScope_;
        $window = _$window_;
        uibModal = _$uibModal_;
        stateParams = _$stateParams_;
        searchReport = _searchReport_;
        $timeout = _$timeout_;
        ngRedux = _$ngRedux_;

        template = ReportChartComponent.template;
        ctrl = controller(ReportChartComponent.controller, {
            $scope: scope,
            rootScope: rootScope,
            $window: $window,
            uibModal: uibModal,
            state: state,
            stateParams: stateParams,
            searchReport: searchReport,
            $timeout: $timeout,
            ngRedux: ngRedux,
            serviceRequests: serviceRequests
        });
    }));

    beforeEach(function() {
        spyOn(ctrl, 'openModal');
        spyOn(ctrl, 'setDataRequest');
        spyOn(ctrl, 'ageChart');

        ctrl.openModal();
        ctrl.setDataRequest();
        ctrl.ageChart();
    });

    it('$rootScope.searchMode exist', function() {
        expect(rootScope.searchMode).toBe(true);
    });
    it('$rootScope.reportMode exist', function() {
        expect(rootScope.reportMode).toBe(true);
    });
    it('$rootScope.reportTypeSet exist', function() {
        expect(rootScope.reportTypeSet).toBe(true);
    });
    it('resultSize', function() {
        expect(ctrl.resultSize).toBe(0);
    });
    it('noResults', function() {
        expect(ctrl.noResults).toBe('');
    });
    it('Controller exist', function() {
        expect(ctrl).toBeDefined();
    });
    it('Template exist', function() {
        expect(template).toBeDefined();
    });
    it("serviceRequests exist", function() {
        expect(serviceRequests).toBeDefined();
    });
    it("openModal was called", function() {
        expect(ctrl.openModal).toHaveBeenCalled();
    });
    it("setDataRequest was called", function() {
        expect(ctrl.setDataRequest).toHaveBeenCalled();
    });
    it("ageChart was called", function() {
        expect(ctrl.ageChart).toHaveBeenCalled();
    });
});