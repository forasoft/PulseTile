import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.APPOINTMENTS, types.APPOINTMENTS_SUCCESS, types.APPOINTMENTS_ERROR],

    shouldCallAPI: (state) => !state.allergies.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/appointments'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.APPOINTMENTS_GET, types.APPOINTMENTS_GET_SUCCESS, types.APPOINTMENTS_GET_ERROR],

    shouldCallAPI: (state) => !state.allergies.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/appointments/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.APPOINTMENTS_CREATE, types.APPOINTMENTS_CREATE_SUCCESS, types.APPOINTMENTS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.allergies.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/appointments',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.APPOINTMENTS_UPDATE, types.APPOINTMENTS_UPDATE_SUCCESS, types.APPOINTMENTS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.allergies.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/appointments',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function appointmentsActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

appointmentsActions.$inject = ['$ngRedux'];