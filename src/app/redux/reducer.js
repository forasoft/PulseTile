import { combineReducers } from 'redux';

import patients from './patients';
import user from './user';
import search from './search';
import messages from './messages';
import diagnoses from './diagnoses';

export default combineReducers({
  patients, user, search, messages, diagnoses
});
