import {bindActionCreators} from 'redux';
import * as types from '../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.REFERRALS, types.REFERRALS_SUCCESS, types.REFERRALS_ERROR],

    shouldCallAPI: (state) => !state.referrals.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/referrals'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.REFERRALS_GET, types.REFERRALS_GET_SUCCESS, types.REFERRALS_GET_ERROR],

    shouldCallAPI: (state) => !state.referrals.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/referrals/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.REFERRALS_CREATE, types.REFERRALS_CREATE_SUCCESS, types.REFERRALS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.referrals.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/referrals',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.REFERRALS_UPDATE, types.REFERRALS_UPDATE_SUCCESS, types.REFERRALS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.referrals.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/referrals',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function referralsActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

referralsActions.$inject = ['$ngRedux'];