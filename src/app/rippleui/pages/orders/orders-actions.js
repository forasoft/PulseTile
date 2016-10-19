import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function all(patientId) {
  return {
    types: [types.ORDERS, types.ORDERS_SUCCESS, types.ORDERS_ERROR],

    shouldCallAPI: (state) => !state.orders.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/laborders'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.ORDERS_GET, types.ORDERS_GET_SUCCESS, types.ORDERS_GET_ERROR],

    shouldCallAPI: (state) => !state.orders.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/laborders/' + compositionId + '?source=' + source
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.ORDERS_CREATE, types.ORDERS_CREATE_SUCCESS, types.ORDERS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.orders.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/laborders', composition,
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function suggestion(patientId, composition) {
  return {
    types: [types.ORDERS_SUGGESTION, types.ORDERS_SUGGESTION_SUCCESS, types.ORDERS_SUGGESTION_ERROR],

    shouldCallAPI: (state) => !state.orders.response,

    config: {
      method: 'get',
      url: '/api/terminology/list/order'
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function ordersActions($ngRedux) {
  let actionCreator = {
    all, get, create, suggestion
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

ordersActions.$inject = ['$ngRedux'];