import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.DIAGNOSES, types.DIAGNOSES_SUCCESS, types.DIAGNOSES_ERROR],

    shouldCallAPI: (state) => !state.diagnoses.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/diagnoses'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.DIAGNOSES_GET, types.DIAGNOSES_GET_SUCCESS, types.DIAGNOSES_GET_ERROR],

    shouldCallAPI: (state) => !state.diagnoses.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/diagnoses/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.DIAGNOSES_CREATE, types.DIAGNOSES_CREATE_SUCCESS, types.DIAGNOSES_CREATE_ERROR],

    shouldCallAPI: (state) => !state.diagnoses.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/diagnoses',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.DIAGNOSES_UPDATE, types.DIAGNOSES_UPDATE_SUCCESS, types.DIAGNOSES_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.diagnoses.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/diagnoses',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function diagnosesActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

diagnosesActions.$inject = ['$ngRedux'];