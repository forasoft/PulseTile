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
let templateGenericMdtDetail= require('./generic-mdt-detail.html');

class GenericMdtDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, genericmdtActions, GenericMdtModal, usSpinnerService) {
    this.edit = function () {
      this.cancerMdt.timeOfMeeting = new Date(this.cancerMdt.timeOfMeeting);
      GenericMdtModal.openModal(this.currentPatient, {title: 'Edit MDT'}, this.cancerMdt, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.cancermdt.dataGet) {
        this.cancerMdt = data.cancermdt.dataGet;
        usSpinnerService.stop('mdtDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.cancermdtLoad = genericmdtActions.get;
    this.cancermdtLoad($stateParams.patientId, $stateParams.cancerMdtIndex);
  }
}

const GenericMdtDetailComponent = {
  template: templateGenericMdtDetail,
  controller: GenericMdtDetailController
};

GenericMdtDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'genericmdtActions', 'GenericMdtModal', 'usSpinnerService'];
export default GenericMdtDetailComponent;