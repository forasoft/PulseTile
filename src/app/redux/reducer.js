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
import results from './results';
import resultsGet from './results-get';
import chart from './chart';
import documents from './documents';
import documentsFindDischarge from './documents-find-discharge';
import documentsFindReferral from './documents-find-referral';
import documentsUploadDischarge from './documents-upload-discharge';
import documentsUploadReferral from './documents-upload-referral';

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
  results,
  resultsGet,
  chart,
  documents,
  documentsFindDischarge,
  documentsFindReferral,
  documentsUploadDischarge,
  documentsUploadReferral
});
