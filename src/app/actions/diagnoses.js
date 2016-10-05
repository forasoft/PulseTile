import {bindActionCreators} from 'redux';
import * as types from '../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.DIAGNOSES, types.DIAGNOSES_SUCCESS, types.DIAGNOSES_ERROR],

    shouldCallAPI: (state) => !state.patients.response,

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
    types: [types.DIAGNOSES, types.DIAGNOSES_SUCCESS, types.DIAGNOSES_ERROR],

    shouldCallAPI: (state) => !state.patients.response,

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
    types: [types.DIAGNOSES, types.DIAGNOSES_SUCCESS, types.DIAGNOSES_ERROR],

    shouldCallAPI: (state) => !state.patients.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/diagnoses'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.DIAGNOSES, types.DIAGNOSES_SUCCESS, types.DIAGNOSES_ERROR],

    shouldCallAPI: (state) => !state.patients.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/diagnoses'
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