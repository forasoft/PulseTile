let templateReferralsList = require('./referrals-list.html');

class ReferralsListController {
  constructor($scope, $state, $stateParams, $ngRedux, referralsActions, serviceRequests, ReferralsModal) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;

    if ($stateParams.filter) {
      this.query = $stateParams.filter;
    }

    this.pageChangeHandler = function (newPage) {
      this.currentPage = newPage;
    };

    if ($stateParams.page) {
      this.currentPage = $stateParams.page;
    }

    this.search = function (row) {
      return (
        angular.lowercase(row.dateOfReferral).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.referralFrom).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.referralTo).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase($scope.query) || '') !== -1
      );
    };

    this.go = function (id) {
      $state.go('referrals-detail', {
        patientId: $stateParams.patientId,
        referralId: id,
        filter: this.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType
      });
    };

    this.selected = function (referralId) {
      return referralId === $stateParams.referralId;
    };

    this.create = function () {
      ReferralsModal.openModal(this.currentPatient, {title: 'Create Referral'}, {}, this.currentUser);
    };

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.referrals.data) {
        this.referrals = data.referrals.data;

        for (var i = 0; i < this.referrals.length; i++) {
          this.referrals[i].dateOfReferral = moment(this.referrals[i].dateOfReferral).format('DD-MMM-YYYY');
        }
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.referralsLoad = referralsActions.all;
    this.referralsLoad($stateParams.patientId);
  }
}

const ReferralsListComponent = {
  template: templateReferralsList,
  controller: ReferralsListController
};

ReferralsListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'referralsActions', 'serviceRequests', 'ReferralsModal'];
export default ReferralsListComponent;