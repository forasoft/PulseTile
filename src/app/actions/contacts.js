import {bindActionCreators} from 'redux';
import * as types from '../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.CONTACTS, types.CONTACTS_SUCCESS, types.CONTACTS_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/contacts'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId) {
  return {
    types: [types.CONTACTS_GET, types.CONTACTS_GET_SUCCESS, types.CONTACTS_GET_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/contacts/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.CONTACTS_CREATE, types.CONTACTS_CREATE_SUCCESS, types.CONTACTS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/contacts',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, composition) {
  return {
    types: [types.CONTACTS_UPDATE, types.CONTACTS_UPDATE_SUCCESS, types.CONTACTS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.contacts.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/contacts',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function contactsActions($ngRedux) {
  let actionCreator = {
    all, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

contactsActions.$inject = ['$ngRedux'];