import { combineReducers } from 'redux';

import patients from '../rippleui/pages/patients-list/patients-reducer-get';
import user from './user';
import search from '../rippleui/search/search-reducer-all';
import messages from './messages';
import diagnoses from '../rippleui/pages/diagnoses/diagnoses-reducer-all';
import diagnosesGet from '../rippleui/pages/diagnoses/diagnoses-reducer-get';
import diagnosesCreate from '../rippleui/pages/diagnoses/diagnoses-reducer-create';
import diagnosesUpdate from '../rippleui/pages/diagnoses/diagnoses-reducer-update';
import allergies from '../rippleui/pages/allergies/allergies-reducer-all';
import allergiesGet from '../rippleui/pages/allergies/allergies-reducer-get';
import allergiesCreate from '../rippleui/pages/allergies/allergies-reducer-create';
import allergiesUpdate from '../rippleui/pages/allergies/allergies-reducer-update';
import medication from '../rippleui/pages/medications/medication-reducer-all';
import medicationGet from '../rippleui/pages/medications/medication-reducer-get';
import medicationCreate from '../rippleui/pages/medications/medication-reducer-create';
import medicationUpdate from '../rippleui/pages/medications/medication-reducer-update';
import contacts from '../rippleui/pages/contacts/contacts-reducer-all';
import contactsGet from '../rippleui/pages/contacts/contacts-reducer-get';
import contactsCreate from '../rippleui/pages/contacts/contacts-reducer-create';
import contactsUpdate from '../rippleui/pages/contacts/contacts-reducer-update';
import orders from '../rippleui/pages/orders/orders-reducer-all';
import ordersGet from '../rippleui/pages/orders/orders-reducer-get';
import ordersCreate from '../rippleui/pages/orders/orders-reducer-create';
import ordersSuggestion from '../rippleui/pages/orders/orders-reducer-suggestion';
import referrals from '../rippleui/pages/referrals/referrals-reducer-all';
import referralsGet from '../rippleui/pages/referrals/referrals-reducer-get';
import referralsCreate from '../rippleui/pages/referrals/referrals-reducer-create';
import referralsUpdate from '../rippleui/pages/referrals/referrals-reducer-update';
import results from '../rippleui/pages/results/results-reducer-all';
import resultsGet from '../rippleui/pages/results/results-reducer-get';
import chart from '../rippleui/search/chart-reducer-get';
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
  referrals,
  referralsGet,
  referralsCreate,
  referralsUpdate,
  results,
  resultsGet,
  chart,
  documents,
  documentsFindDischarge,
  documentsFindReferral,
  documentsUploadDischarge,
  documentsUploadReferral
});
