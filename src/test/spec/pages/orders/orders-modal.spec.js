'use strict';
import OrdersModal from '../../../../app/rippleui/pages/orders/orders-modal';
import '../../../../app/index';

describe('Orders Modal', function() {

  beforeEach(angular.mock.module('ripple-ui'));

  let scope, controller, uibModal, ordersActions, ngRedux, stateParams;

  beforeEach(inject(($injector, $controller, _$uibModal_, _ordersActions_, _$ngRedux_, _$stateParams_) => {
    controller = $controller;
    scope = $injector.get('OrdersModal');
    uibModal = _$uibModal_;
    ngRedux = _$ngRedux_;
    stateParams = _$stateParams_;
    ordersActions = _ordersActions_;
  }));

  it('Orders Modal component exist', function() {
    expect(OrdersModal).toBeDefined();
  });
});