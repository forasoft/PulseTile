let templateImageDetail= require('./image-detail.html');

class ImageDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, imageActions, ImageModal) {
    var seriesIdsIndex;

    this.openImage = function (imageId) {
      this.instanceLoad($stateParams.patientId, imageId);
      this.imageId = imageId;
    };

    this.series = [];

    this.setCurrentPageData = function (data) {
      if (data.patientsGet.data) {
        this.currentPatient = data.patientsGet.data;
      }
      if (data.series.dataGet) {
        this.study = data.series.dataGet;

        var seriesIds = this.study.seriesIds;
        this.instanceIds = [];

        for (var i = 0; i < seriesIds.length; i++) {
          this.instanceIdLoad.getInstanceId($stateParams.patientId, seriesIds[i], $stateParams.source);
          this.seriesDetailsLoad.getSeriesDetails($stateParams.patientId, seriesIds[i]);
          seriesIdsIndex = i;
        }
      }
      if (data.instance.data) {
        this.instance = data.instance.data.parentSeries;
        ImageModal.openModal(this.currentPatient, {title: 'View Dicom Image'}, this.imageId, this.series, this.instance);
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

     var findFirstInstanceId = function (result) {
      if (result) {
        this.instanceIds[seriesIdsIndex] = result.data.instanceId;
      }
    };

    var findSeriesMetadata = function(result) {
      if (result) {
        this.series[seriesIdsIndex] = result.data;
        this.series[seriesIdsIndex].seriesDate = moment(this.series[seriesIdsIndex].seriesDate).format('DD-MMM-YYYY');
        this.series[seriesIdsIndex].seriesTime = moment(this.series[seriesIdsIndex].seriesTime).format('h:mma');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state),
      getInstanceId: findFirstInstanceId(state.instanceId),
      getSeriesDetails: findSeriesMetadata(state.seriesDetails)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.imageLoad = imageActions.getAllSeriesInStudy;
    this.imageLoad($stateParams.patientId, $stateParams.studyId, $stateParams.source);
    this.instanceLoad = imageActions.getInstance;
    this.instanceIdLoad = imageActions.getInstanceId;
    this.seriesDetailsLoad = imageActions.getSeriesDetails;
  }
}

const ImageDetailComponent = {
  template: templateImageDetail,
  controller: ImageDetailController
};

ImageDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'imageActions', 'ImageModal'];
export default ImageDetailComponent;