/*
  ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
  ~  
  ~  Licensed under the Apache License, Version 2.0 (the "License");
  ~  you may not use this file except in compliance with the License.
  ~  You may obtain a copy of the License at
  ~  
  ~    http://www.apache.org/licenses/LICENSE-2.0

  ~  Unless required by applicable law or agreed to in writing, software
  ~  distributed under the License is distributed on an "AS IS" BASIS,
  ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~  See the License for the specific language governing permissions and
  ~  limitations under the License.
*/

let templateClinicalnotesList = require('./clinicalnotes-list.html');

class ClinicalnotesListController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalnotesActions, serviceRequests, usSpinnerService) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, breadcrumbs: $state.router.globals.current.breadcrumbs, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    $scope.query = '';
    this.isFilter = false;
    this.isShowCreateBtn = $state.router.globals.$current.name !== 'clinicalNotes-create';


    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.clinicalnotes.data) {
        // this.clinicalNotes = data.clinicalnotes.data;
        // for (var i = 0; i < this.clinicalNotes.length; i++) {
        //   this.clinicalNotes[i].dateCreated = moment(this.clinicalNotes[i].dateCreated).format('DD-MMM-YYYY');
        // }
      }
      var date = new Date();
      this.clinicalNotes = [{
        type: 'Top 3 Things',
        note: '1) Concern re memory 2) Eyesight issues 3) Heart Pains',
        author: 'Ivor Cox',
        dateCreated: date.setDate(date.getDate() - 4),
        source: 'ethercis'
      }, {
        type: 'Reflection',
        note: 'After GP visit today I have a better understanding of my mild dementia and am going to manage it positively, its up to me!',
        author: 'Ivor Cox',
        dateCreated: date,
        source: 'marand'
      }, {
        type: 'Goal',
        note: 'Goal is better fitness. So will walk 3 k around the local park 3 times a week.',
        author: 'Ivor Cox',
        dateCreated: date.setDate(date.getDate() - 2),
        source: 'ethercis'
      }];
      for (var i = 0; i < this.clinicalNotes.length; i++) {
        this.clinicalNotes[i].dateCreated = moment(this.clinicalNotes[i].dateCreated).format('DD-MMM-YYYY');
      }
      usSpinnerService.stop("patientSummary-spinner");

      if (serviceRequests.currentUserData) {
        this.currentUser = serviceRequests.currentUserData;
      }
    };

    this.toggleFilter = function () {
      this.isFilter = !this.isFilter;
    };
    
    this.create = function () {
      $state.go('clinicalNotes-create', {
        patientId: $stateParams.patientId,
        filter: this.query,
        page: this.currentPage
      });
    };
    
    this.go = function (id, clinicalNoteSource) {
      /*
        TODO: Only for demo
      */
      id = id || 1;
      $state.go('clinicalNotes-detail', {
        patientId: $stateParams.patientId,
        clinicalNoteIndex: id,
        filter: $scope.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: JSON.stringify(clinicalNoteSource)
      });
    };

    this.pageChangeHandler = function (newPage) {
      $scope.currentPage = newPage;
    };

    if ($stateParams.page) {
      $scope.currentPage = $stateParams.page;
    }

    this.search = function (row) {
      return (
        row.type.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.author.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.dateCreated.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1 ||
        row.source.toLowerCase().indexOf($scope.query.toLowerCase() || '') !== -1
      );
    };

    if ($stateParams.filter) {
      $scope.query = $stateParams.filter;
    }


    this.selected = function (clinicalNoteIndex) {
      return clinicalNoteIndex === $stateParams.clinicalNoteIndex;
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clinicalnotesLoad = clinicalnotesActions.all;
    this.clinicalnotesLoad($stateParams.patientId);
  }
}

const ClinicalnotesListComponent = {
  template: templateClinicalnotesList,
  controller: ClinicalnotesListController
};

ClinicalnotesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalnotesActions', 'serviceRequests', 'usSpinnerService'];
export default ClinicalnotesListComponent;