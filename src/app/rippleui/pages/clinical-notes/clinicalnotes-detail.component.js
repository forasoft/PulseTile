let templateClinicalnotesDetail = require('./clinicalnotes-detail.html');

class ClinicalnotesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalnotesActions, serviceRequests, ClinicalnotesModal, usSpinnerService) {
    /*
      TODO: Only for demo
    */
    this.clinicalNote = JSON.parse($stateParams.source);
    
    this.setCurrentPageData = function (data) {
      // if (data.patientsGet.data) {
      //   this.currentPatient = data.patientsGet.data;
      // }
      // if (data.clinicalnotes.dataGet) {
      //   this.clinicalNote = data.clinicalnotes.dataGet;
      //   this.dateCreated = moment(this.clinicalNote.dateCreated).format('DD-MMM-YYYY');

      //   usSpinnerService.stop("clinicalNoteDetail-spinner");
      // }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);



    // this.clinicalnotesLoad = clinicalnotesActions.get;
    // this.clinicalnotesLoad($stateParams.patientId, $stateParams.clinicalNoteIndex, $stateParams.source);
  
    //Edit Clinical Note
    
    $scope.isEdit = false;
    
    this.edit = function () {
      $scope.isEdit = true;

      $scope.currentUser = this.currentUser;
      $scope.clinicalNoteEdit = Object.assign({}, this.clinicalNote)
      $scope.patient = this.currentPatient;

      $scope.clinicalNoteEdit.dateCreated = new Date($scope.clinicalNote.dateCreated).toISOString().slice(0, 10);
      // ClinicalnotesModal.openModal(this.currentPatient, {title: 'Edit Clinical Note'}, this.clinicalNote, this.currentUser);
    };
    this.cancelEdit = function () {
      $scope.isEdit = false;
    };

    $scope.confirmEdit = function (clinicalNoteForm, clinicalNote) {
      $scope.formSubmitted = true;

      if (clinicalNoteForm.$valid) {
        let toUpdate = {
          type: clinicalNote.type,
          note: clinicalNote.note,
          author: clinicalNote.author,
          source: clinicalNote.source,
          sourceId: clinicalNote.sourceId
        };

        this.clinicalNote = Object.assign(this.clinicalNote, $scope.clinicalNoteEdit);
        $scope.isEdit = false;
        $scope.clinicalnotesUpdate($scope.patient.id, toUpdate);
        setTimeout(function () {
          $state.go('clinicalNotes-detail', {
            patientId: $scope.patient.id,
            clinicalNoteIndex: clinicalNote.sourceId
          });
        }, 1000);
      }
    };
  }
}

const ClinicalnotesDetailComponent = {
  template: templateClinicalnotesDetail,
  controller: ClinicalnotesDetailController
};

ClinicalnotesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalnotesActions', 'serviceRequests', 'ClinicalnotesModal', 'usSpinnerService'];
export default ClinicalnotesDetailComponent;