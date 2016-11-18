'use strict';
import OrdersListComponent from '../../../../app/rippleui/pages/orders/orders-list.component.js';
import '../../../../app/index';

describe('Orders List', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, ctrl, controller, template, stateParams, state, ngRedux, ordersActions, serviceRequests, OrdersModal, usSpinnerService;

  beforeEach(inject(($injector, $controller, _$state_, _$stateParams_, _$ngRedux_, _ordersActions_, _serviceRequests_, _OrdersModal_, _usSpinnerService_) => {
    controller = $controller;
    scope = $injector.get('$rootScope').$new();
    state = _$state_;
    serviceRequests = _serviceRequests_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    ordersActions = _ordersActions_;
    OrdersModal = _OrdersModal_;
    usSpinnerService = _usSpinnerService_;

    template = OrdersListComponent.template;

    ctrl = controller(OrdersListComponent.controller, {
      $scope: scope,
      $state: state,
      $stateParams: stateParams,
      $ngRedux: ngRedux,
      ordersActions: ordersActions,
      serviceRequests: serviceRequests,
      OrdersModal: OrdersModal,
      usSpinnerService: usSpinnerService
    });
    // scope.$digest();
  }));

  it('currentPage', function() {
    expect(scope.query).toBe('');
  });
  it('Template exist', function() {
    expect(template).toBeDefined();
  });
  it('Controller exist', function() {
    expect(ctrl).toBeDefined();
  });
});