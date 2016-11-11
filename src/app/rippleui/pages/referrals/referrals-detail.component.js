let templateReferralsDetail= require('./referrals-detail.html');

class ReferralsDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, referralsActions, ReferralsModal, usSpinnerService) {
    this.edit = function () {
      ReferralsModal.openModal(this.currentPatient, {title: 'Edit Referral'}, this.referral, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.referrals.dataGet) {
        this.referral = data.referrals.dataGet;
        usSpinnerService.stop('referralsDetail-spinner');
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);
console.log('$stateParams.referralId', $stateParams.referralId);
    this.referralsLoad = referralsActions.get;
    this.referralsLoad($stateParams.patientId, $stateParams.referralId);
  }
}

const ReferralsDetailComponent = {
  template: templateReferralsDetail,
  controller: ReferralsDetailController
};

ReferralsDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'ReferralsModal', 'usSpinnerService'];
export default ReferralsDetailComponent;