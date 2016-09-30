import * as types from '../constants/ActionTypes';
import userTemp from '../helpers/userTemp';

const INITIAL_STATE = {
  error: false,
  data: null
};

export default function posts(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.USER_LOGIN]: (state) => {
      return Object.assign({}, state, {
        error: false
      });
    },
    [types.USER_LOGIN_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        data: payload.response
      });
    },
    [types.USER_LOGIN_ERROR]: (state) => {
      return Object.assign({}, state, {
        error: payload.error,
        data: userTemp() //testing user
      });
    }
  };

  return actions[action.type] ?
      actions[action.type](state) :
      state;
}
