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
import medication from './medication';
import medicationGet from './medication-get';
import medicationCreate from './medication-create';
import medicationUpdate from './medication-update';
import contacts from './contacts';
import contactsGet from './contacts-get';
import contactsCreate from './contacts-create';
import contactsUpdate from './contacts-update';
import orders from './orders';
import ordersGet from './orders-get';
import ordersCreate from './orders-create';
import ordersSuggestion from './orders-suggestion';
import referrals from './referrals';
import referralsGet from './referrals-get';
import referralsCreate from './referrals-create';
import referralsUpdate from './referrals-update';
import results from './results';
import resultsGet from './results-get';
import chart from './chart';

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
  allergiesUpdate,
  medication,
  medicationGet,
  medicationCreate,
  medicationUpdate,
  contacts,
  contactsGet,
  contactsCreate,
  contactsUpdate,
  orders,
  ordersGet,
  ordersCreate,
  ordersSuggestion,
  referrals,
  referralsGet,
  referralsCreate,
  referralsUpdate,
  results,
  resultsGet,
  chart
});
