let templateOrdersDetail= require('./orders-detail.html');

class OrdersDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, ordersActions, usSpinnerService) {

    this.setCurrentPageData = function (data) {
      if (data.orders.dataGet) {
        this.order = data.orders.dataGet;
        usSpinnerService.stop('ordersDetail-spinner');
      }
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.ordersLoad = ordersActions.get;
    this.ordersLoad($stateParams.patientId, $stateParams.orderId, $stateParams.source);
  }
}

const OrdersDetailComponent = {
  template: templateOrdersDetail,
  controller: OrdersDetailController
};

OrdersDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'ordersActions', 'usSpinnerService'];
export default OrdersDetailComponent;