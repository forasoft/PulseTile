import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.MEDICATIONS, types.MEDICATIONS_SUCCESS, types.MEDICATIONS_ERROR],

    shouldCallAPI: (state) => !state.medication.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/medications'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.MEDICATIONS_GET, types.MEDICATIONS_GET_SUCCESS, types.MEDICATIONS_GET_ERROR],

    shouldCallAPI: (state) => !state.medication.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/medications/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.MEDICATIONS_CREATE, types.MEDICATIONS_CREATE_SUCCESS, types.MEDICATIONS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.medication.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/medications',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.MEDICATIONS_UPDATE, types.MEDICATIONS_UPDATE_SUCCESS, types.MEDICATIONS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.medication.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/medications',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function medicationsActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

medicationsActions.$inject = ['$ngRedux'];