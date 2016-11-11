import * as types from '../../../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: null,
  dataGet: null,
  dataCreate: null,
  dataUpdate: null
};

export default function procedures(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.PROCEDURES]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.PROCEDURES_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        data: payload.response
      });
    },
    [types.PROCEDURES_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.PROCEDURES_GET]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.PROCEDURES_GET_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataGet: payload.response
      });
    },
    [types.PROCEDURES_GET_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.PROCEDURES_CREATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.PROCEDURES_CREATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataCreate: payload.response
      });
    },
    [types.PROCEDURES_CREATE_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.PROCEDURES_UPDATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.PROCEDURES_UPDATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataUpdate: payload.response
      });
    },
    [types.PROCEDURES_UPDATE_ERROR]: (state) => {
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