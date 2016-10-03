import { combineReducers } from 'redux';

import patients from './patients';
import user from './user';
import search from './search';

export default combineReducers({
  patients, user, search
});
