import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.RESULTS, types.RESULTS_SUCCESS, types.RESULTS_ERROR],

    shouldCallAPI: (state) => !state.results.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/labresults'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.RESULTS_GET, types.RESULTS_GET_SUCCESS, types.RESULTS_GET_ERROR],

    shouldCallAPI: (state) => !state.results.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/labresults/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function resultsActions($ngRedux) {
  let actionCreator = {
    all, get
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

resultsActions.$inject = ['$ngRedux'];