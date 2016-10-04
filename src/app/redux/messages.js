import * as types from '../constants/ActionTypes';

const INITIAL_STATE = {
  data: null
};

export default function messages(state = INITIAL_STATE, action) {
  console.log('messages reducer ', state, action);
  let msg = null;
  const {payload} = action;
  
  switch (action.type) {
    case types.MESSAGE_GET:
      return INITIAL_STATE;
    case types.MESSAGE_SET:
      return INITIAL_STATE.data = payload;
    default:
      return state;
  }
}
