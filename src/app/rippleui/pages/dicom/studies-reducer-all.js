import * as types from '../../../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: null
};

export default function studies(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.STUDIES]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.STUDIES_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        data: payload.response
      });
    },
    [types.STUDIES_ERROR]: (state) => {
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