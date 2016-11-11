export default function AllergiesModal($uibModal, allergiesActions, $ngRedux) {
  var isModalClosed = true;

  var openModal = function (patient, modal, dicomImageId, series, seriesId) {
    if (isModalClosed) {
      isModalClosed = false;

      var modalInstance = $uibModal.open({
        template: require('./image-modal.html'),
        size: 'lg',
        controller: function ($scope, $state, $uibModalInstance) {
          $scope.patient = patient;
          $scope.modal = modal;
          $scope.dicomId = dicomImageId;

          $scope.ok = function () {
            $uibModalInstance.close();
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
AllergiesModal.$inject = ['$uibModal', 'allergiesActions', '$ngRedux'];