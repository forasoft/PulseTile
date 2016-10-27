import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.CANCERMDT, types.CANCERMDT_SUCCESS, types.CANCERMDT_ERROR],

    shouldCallAPI: (state) => !state.cancermdt.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/mdtreports/'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.CANCERMDT_GET, types.CANCERMDT_GET_SUCCESS, types.CANCERMDT_GET_ERROR],

    shouldCallAPI: (state) => !state.cancermdt.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/mdtreports/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.CANCERMDT_CREATE, types.CANCERMDT_CREATE_SUCCESS, types.CANCERMDT_CREATE_ERROR],

    shouldCallAPI: (state) => !state.cancermdt.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/mdtreports',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.CANCERMDT_UPDATE, types.CANCERMDT_UPDATE_SUCCESS, types.CANCERMDT_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.cancermdt.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/mdtreports',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function cancermdtActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

cancermdtActions.$inject = ['$ngRedux'];