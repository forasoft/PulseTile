import { combineReducers } from 'redux';

import patients from './patients';
import user from './user';
import search from './search';
import messages from './messages';
import diagnoses from './diagnoses';
import diagnosesGet from './diagnoses-get';
import diagnosesCreate from './diagnoses-create';
import diagnosesUpdate from './diagnoses-update';
import allergies from './allergies';
import allergiesGet from './allergies-get';
import allergiesCreate from './allergies-create';
import allergiesUpdate from './allergies-update';

export default combineReducers({
  patients, 
  user, 
  search, 
  messages, 
  diagnoses, 
  diagnosesGet, 
  diagnosesCreate, 
  diagnosesUpdate,
  allergies,
  allergiesGet,
  allergiesCreate,
  allergiesUpdate
});
