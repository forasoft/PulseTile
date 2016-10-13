import * as types from '../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: null
};

export default function orders(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.ORDERS_SUGGESTION]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.ORDERS_SUGGESTION_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        data: payload.response
      });
    },
    [types.ORDERS_SUGGESTION_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    }
  };

  return actions[action.type] ?
    actions[action.type](state) :
    state;
}