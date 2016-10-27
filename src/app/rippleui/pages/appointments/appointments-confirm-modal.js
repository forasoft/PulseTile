export default function AppointmentConfirmModal($uibModal, serviceRequests) {
var isModalClosed = true;
    var openModal = function (modal, time) {
        if (isModalClosed) {
            isModalClosed = false;
            var modalInstance = $uibModal.open({
                template: require('./appointments-confirm-modal.html'),
                size: 'sm',
                controller: function ($scope, $state, $uibModalInstance) {

                    $scope.modal = $uibModalInstance;
                    $scope.time = new Date(time);

                    $scope.ok = function () {
                        serviceRequests.publisher('apptTime', {time: $scope.time});
                        $uibModalInstance.close();
                    };

                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
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
AppointmentConfirmModal.$inject = ['$uibModal', 'serviceRequests'];
