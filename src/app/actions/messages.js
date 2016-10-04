import {bindActionCreators} from 'redux';
import * as types from '../constants/ActionTypes';

export function setMessage(msg) {
  return {
    types: [types.MESSAGE_SET],
    sender: (msg)
  };
}
export function getMessage() {
  return {
    types: [types.MESSAGE_GET]
  };
}

export default function messagesActions($ngRedux) {
  let actionCreator = {
    setMessage, getMessage
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

messagesActions.$inject = ['$ngRedux'];