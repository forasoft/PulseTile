import { combineReducers } from 'redux';

import patients from './patients';
import user from './user';
import messages from './messages';

export default combineReducers({
  patients, user, messages
});
