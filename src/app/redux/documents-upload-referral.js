import * as types from '../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: null
};

export default function allergies(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.DOCUMENTS_UPLOAD_REFERRAL]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.DOCUMENTS_UPLOAD_REFERRAL_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        data: payload.response
      });
    },
    [types.DOCUMENTS_UPLOAD_REFERRAL_ERROR]: (state) => {
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