let templateOrdersList = require('./orders-list.html');

class OrdersListController {
  constructor($scope, $state, $stateParams, $ngRedux, ordersActions, serviceRequests, OrdersModal) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    if ($stateParams.filter) {
      this.query = $stateParams.filter;
    }

    this.search = function (row) {
      return (
        angular.lowercase(row.name).indexOf(angular.lowercase(this.query) || '') !== -1 ||
        angular.lowercase(row.orderDate).indexOf(angular.lowercase(this.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase(this.query) || '') !== -1
      );
    };

    this.create = function () {
      OrdersModal.openModal(this.currentPatient, {title: 'Create Order'}, {}, this.currentUser);
    };

    this.go = function (id, source) {
      $state.go('orders-detail', {
        patientId: $stateParams.patientId,
        orderId: id,
        filter: this.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: source
      });
    };

    this.setCurrentPageData = function (data) {
      if (data.orders.data) {
        this.orders = data.orders.data;
      }
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    this.selected = function (orderId) {
      return orderId === $stateParams.orderId;
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);
    
    $scope.$on('$destroy', unsubscribe);
    
    this.ordersLoad = ordersActions.all;
    this.ordersLoad($stateParams.patientId);
  }
}

const OrdersListComponent = {
  template: templateOrdersList,
  controller: OrdersListController
};

OrdersListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'ordersActions', 'serviceRequests', 'OrdersModal'];
export default OrdersListComponent;