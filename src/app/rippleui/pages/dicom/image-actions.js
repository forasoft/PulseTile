import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function allStudies(patientId) {
  return {
    types: [types.STUDIES, types.STUDIES_SUCCESS, types.STUDIES_ERROR],

    shouldCallAPI: (state) => !state.studies.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/dicom/' + 'studies'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function getAllSeriesInStudy(patientId, studyId, source) {
  return {
    types: [types.SERIES_GET, types.SERIES_GET_SUCCESS, types.SERIES_GET_ERROR],

    shouldCallAPI: (state) => !state.series.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/dicom/' + 'studies/' + studyId + '/series' + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function getSeriesDetails(patientId, seriesId, source) {
  return {
    types: [types.SERIES_DETAILS_GET, types.SERIES_DETAILS_GET_SUCCESS, types.SERIES_DETAILS_GET_ERROR],

    shouldCallAPI: (state) => !state.seriesDetails.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/dicom/' + 'series/' + seriesId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function getInstanceId(patientId, seriesId, source) {
  return {
    types: [types.INSTANCE_ID_GET, types.INSTANCE_ID_GET_SUCCESS, types.INSTANCE_ID_GET_ERROR],

    shouldCallAPI: (state) => !state.instanceId.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/dicom/' + 'series/' + seriesId + '/instance' + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function getInstance(patientId, instanceId, source) {
  return {
    types: [types.INSTANCE_GET, types.INSTANCE_GET_SUCCESS, types.INSTANCE_GET_ERROR],

    shouldCallAPI: (state) => !state.instance.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/dicom/' + 'instances/' + instanceId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function allergiesActions($ngRedux) {
  let actionCreator = {
    allStudies, getAllSeriesInStudy, getSeriesDetails, getInstanceId, getInstance
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

allergiesActions.$inject = ['$ngRedux'];