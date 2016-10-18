import {bindActionCreators} from 'redux';
import * as types from '../constants/ActionTypes';

export function findAllDocuments(patientId) {
  return {
    types: [types.DOCUMENTS, types.DOCUMENTS_SUCCESS, types.DOCUMENTS_ERROR],

    shouldCallAPI: (state) => !state.allergies.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/documents'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function findReferral(patientId, referralId, source) {
  return {
    types: [types.DOCUMENTS_FIND_REFERRAL, types.DOCUMENTS_FIND_REFERRAL_SUCCESS, types.DOCUMENTS_FIND_REFERRAL_ERROR],

    shouldCallAPI: (state) => !state.allergies.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/documents/referral/' + referralId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function findDischarge(patientId, dischargeId, source) {
  return {
    types: [types.DOCUMENTS_FIND_DISCHARGE, types.DOCUMENTS_FIND_DISCHARGE_SUCCESS, types.DOCUMENTS_FIND_DISCHARGE_ERROR],

    shouldCallAPI: (state) => !state.allergies.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/documents/discharge/' + dischargeId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function uploadReferral(patientId, referral) {
  return {
    types: [types.DOCUMENTS_UPLOAD_REFERRAL, types.DOCUMENTS_UPLOAD_REFERRAL_SUCCESS, types.DOCUMENTS_UPLOAD_REFERRAL_ERROR],

    shouldCallAPI: (state) => !state.allergies.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/documents/referral',
      data: referral
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function uploadDischarge(patientId, discharge) {
  return {
    types: [types.DOCUMENTS_UPLOAD_DISCHARGE, types.DOCUMENTS_UPLOAD_DISCHARGE_SUCCESS, types.DOCUMENTS_UPLOAD_DISCHARGE_ERROR],

    shouldCallAPI: (state) => !state.allergies.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/documents/discharge',
      data: discharge
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function documentsActions($ngRedux) {
  let actionCreator = {
    findAllDocuments, findReferral, findDischarge, uploadReferral, uploadDischarge
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

documentsActions.$inject = ['$ngRedux'];