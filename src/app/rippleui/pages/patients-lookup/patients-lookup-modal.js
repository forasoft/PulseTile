export default function LookupModal($uibModal) {
    var isModalClosed = true;

    var openModal = function () {
        if (isModalClosed) {
            isModalClosed = false;


            var modalInstance = $uibModal.open({
                template: require('./patients-lookup.html'),
                size: 'lg',
                controller: function ($scope, $state, $uibModalInstance) {
                    $scope.dismiss = function () {
                        $scope.$dismiss();
                        $state.go('patients-charts');
                    };

                    $scope.save = function () {
                        $scope.$close(true);
                        $state.go('patients-charts');
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
LookupModal.$inject = ['$uibModal'];