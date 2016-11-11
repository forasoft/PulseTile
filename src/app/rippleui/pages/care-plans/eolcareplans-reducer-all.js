import * as types from '../../../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: null,
  dataGet: null,
  dataCreate: null,
  dataUpdate: null
};

export default function eolcareplans(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.EOLCAREPLANS]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.EOLCAREPLANS_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        data: payload.response
      });
    },
    [types.EOLCAREPLANS_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.EOLCAREPLANS_GET]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.EOLCAREPLANS_GET_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataGet: payload.response
      });
    },
    [types.EOLCAREPLANS_GET_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.EOLCAREPLANS_CREATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.EOLCAREPLANS_CREATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataCreate: payload.response
      });
    },
    [types.EOLCAREPLANS_CREATE_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.EOLCAREPLANS_UPDATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.EOLCAREPLANS_UPDATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataUpdate: payload.response
      });
    },
    [types.EOLCAREPLANS_UPDATE_ERROR]: (state) => {
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