let templateProceduresDetail= require('./procedures-detail.html');

class ProceduresDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, proceduresActions, ProceduresModal, usSpinnerService) {
    this.edit = function () {
      this.procedure.time = new Date(this.procedure.time);
      ProceduresModal.openModal(this.currentPatient, {title: 'Edit Procedure'}, this.procedure, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.procedures.dataGet) {
        this.procedure = data.procedures.dataGet;
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