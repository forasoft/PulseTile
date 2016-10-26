let templateProceduresDetail= require('./procedures-detail.html');

class ProceduresDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, proceduresActions, ProceduresModal, usSpinnerService) {
    this.edit = function () {
      ProceduresModal.openModal(this.currentPatient, {title: 'Edit Procedure'}, this.procedure, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.proceduresGet.data) {
        this.procedure = data.proceduresGet.data;
        usSpinnerService.stop('proceduresDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.proceduresLoad = proceduresActions.get;
    this.proceduresLoad($stateParams.patientId, $stateParams.procedureId, $stateParams.source);
  }
}

const ProceduresDetailComponent = {
  template: templateProceduresDetail,
  controller: ProceduresDetailController
};

ProceduresDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'proceduresActions', 'ProceduresModal', 'usSpinnerService'];
export default ProceduresDetailComponent;