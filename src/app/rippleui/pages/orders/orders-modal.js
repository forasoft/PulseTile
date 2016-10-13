export default function OrdersModal($uibModal, ordersActions, $stateParams, $ngRedux) {
  var isModalClosed = true;
 
  var openModal = function (patient, modal, order, currentUser) {
    if (isModalClosed) {
      isModalClosed = false;


      var modalInstance = $uibModal.open({
        template: require('./orders-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.currentUser = currentUser;
          $scope.order = order;
          $scope.patient = patient;
          $scope.modal = modal;
          $scope.order.author = 'Dr John Smith';
          $scope.firstPage = true;
          $scope.chosenOrders = [];

          if (modal.title === 'Create Order') {
            $scope.order.orderDate = new Date().toISOString().slice(0, 10);
          }

          $scope.setCurrentPageData = function (data) {
            if (data.ordersSuggestion.data) {
              $scope.suggestions = data.ordersSuggestion.data;
            }
          };

          let unsubscribe = $ngRedux.connect(state => ({
            getStoreData: $scope.setCurrentPageData(state)
          }))($scope);
          
          $scope.$on('$destroy', unsubscribe);
          $scope.ordersLoad = ordersActions.suggestion;
          $scope.ordersLoad();

          $scope.idSelectedLeft = null;
          $scope.idSelectedRight = null;

          $scope.setSelectedLeft = function (idSelectedLeft) {
            $scope.idSelectedRight = null;
            $scope.idSelectedLeft = idSelectedLeft;
          };

          $scope.setSelectedRight = function (idSelectedRight) {
            $scope.idSelectedLeft = null;
            $scope.idSelectedRight = idSelectedRight;
          };

          $scope.ok = function (contactForm, contact) {
            $scope.formSubmitted = true;

            if (contactForm.$valid) {
              $uibModalInstance.close(contact);
              $scope.ordersCreate($scope.patient.id, $scope.chosenOrders);
              $state.go('orders-list', {
                patientId: $scope.patient.id,
                filter: $scope.query,
                page: $scope.currentPage
              }, {
                reload: true
              });
            }
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };

          $scope.toggleSelectedItem = function (idSelected) {
            if ($scope.isInSuggestionsList(idSelected)) {
              $scope.setSelectedLeft(idSelected);
              for (var i = 0; i < $scope.suggestions.length; i++) {
                if ($scope.suggestions[i].code === $scope.idSelectedLeft) {
                  $scope.chosenOrders.push($scope.suggestions[i]);
                  $scope.suggestions.splice(i, 1);
                }
              }
            } else {
              $scope.setSelectedRight(idSelected);
              for (var a = 0; a < $scope.chosenOrders.length; a++) {
                if ($scope.chosenOrders[a].code === $scope.idSelectedRight) {
                  $scope.suggestions.push($scope.chosenOrders[a]);
                  $scope.chosenOrders.splice(a, 1);
                }
              }
            }
            if ($scope.chosenOrders.length === 0) {
              $scope.firstPage = true;
            }
          };

          $scope.isInSuggestionsList = function (idSelected) {
            for (var b = 0; b < $scope.suggestions.length; b++) {
              if ($scope.suggestions[b].code === idSelected) {
                return true;
              }
            }
            return false;
          };

          $scope.moveItem = function () {
            if ($scope.idSelectedLeft === null) {
              for (var c = 0; c < $scope.chosenOrders.length; c++) {
                if ($scope.chosenOrders[c].code === $scope.idSelectedRight) {
                  $scope.suggestions.push($scope.chosenOrders[c]);
                  $scope.chosenOrders.splice(c, 1);
                }
              }
            } else {
              for (var d = 0; d < $scope.suggestions.length; d++) {
                if ($scope.suggestions[d].code === $scope.idSelectedLeft) {
                  $scope.chosenOrders.push($scope.suggestions[d]);
                  $scope.suggestions.splice(d, 1);
                }
              }
            }
          };

          $scope.pageTwo = function () {
            $scope.firstPage = false;
          };

          $scope.pageOne = function () {
            $scope.firstPage = true;
          };

          $scope.openDatepicker = function ($event, name) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope[name] = true;
          };

          $scope.ordersCreate = ordersActions.create;
        }
      });
    }
   
    modalInstance.result.then(function() {
      isModalClosed = true;
    }, function() {
      isModalClosed = true;
    });
   
  };
 
  return {
    isModalClosed: isModalClosed,
    openModal: openModal
  };
}
OrdersModal.$inject = ['$uibModal', 'ordersActions', '$stateParams', '$ngRedux'];