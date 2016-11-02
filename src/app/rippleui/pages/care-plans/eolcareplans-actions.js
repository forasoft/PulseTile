import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.EOLCAREPLANS, types.EOLCAREPLANS_SUCCESS, types.EOLCAREPLANS_ERROR],

    shouldCallAPI: (state) => !state.eolcareplans.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/eolcareplans'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.EOLCAREPLANS_GET, types.EOLCAREPLANS_GET_SUCCESS, types.EOLCAREPLANS_GET_ERROR],

    shouldCallAPI: (state) => !state.eolcareplans.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/eolcareplans/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.EOLCAREPLANS_CREATE, types.EOLCAREPLANS_CREATE_SUCCESS, types.EOLCAREPLANS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.eolcareplans.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/eolcareplans',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.EOLCAREPLANS_UPDATE, types.EOLCAREPLANS_UPDATE_SUCCESS, types.EOLCAREPLANS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.eolcareplans.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/eolcareplans',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function eolcareplansActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

eolcareplansActions.$inject = ['$ngRedux'];