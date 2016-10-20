import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.PROCEDURES, types.PROCEDURES_SUCCESS, types.PROCEDURES_ERROR],

    shouldCallAPI: (state) => !state.procedures.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/procedures'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.PROCEDURES_GET, types.PROCEDURES_GET_SUCCESS, types.PROCEDURES_GET_ERROR],

    shouldCallAPI: (state) => !state.procedures.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/procedures/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.PROCEDURES_CREATE, types.PROCEDURES_CREATE_SUCCESS, types.PROCEDURES_CREATE_ERROR],

    shouldCallAPI: (state) => !state.procedures.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/procedures',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.PROCEDURES_UPDATE, types.PROCEDURES_UPDATE_SUCCESS, types.PROCEDURES_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.procedures.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/procedures',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function proceduresActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

proceduresActions.$inject = ['$ngRedux'];