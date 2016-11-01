import { combineReducers } from 'redux';

import patients from '../rippleui/pages/patients-list/patients-reducer-all';
import patientsGet from '../rippleui/pages/patients-list/patients-reducer-get';
import user from './user';
import search from '../rippleui/search/search-reducer-all';
import diagnoses from '../rippleui/pages/diagnoses/diagnoses-reducer-all';
import allergies from '../rippleui/pages/allergies/allergies-reducer-all';
import medication from '../rippleui/pages/medications/medication-reducer-all';
import contacts from '../rippleui/pages/contacts/contacts-reducer-all';
import orders from '../rippleui/pages/orders/orders-reducer-all';
import referrals from '../rippleui/pages/referrals/referrals-reducer-all';
import referralsGet from '../rippleui/pages/referrals/referrals-reducer-get';
import referralsCreate from '../rippleui/pages/referrals/referrals-reducer-create';
import referralsUpdate from '../rippleui/pages/referrals/referrals-reducer-update';
import procedures from '../rippleui/pages/procedures/procedures-reducer-all';
import proceduresGet from '../rippleui/pages/procedures/procedures-reducer-get';
import proceduresCreate from '../rippleui/pages/procedures/procedures-reducer-create';
import proceduresUpdate from '../rippleui/pages/procedures/procedures-reducer-update';
import heightAndWeight from '../rippleui/pages/height-and-weight/heightAndWeight-reducer-all';
import cancermdt from '../rippleui/pages/generic-mdt/generic-mdt-reducer-all';
import results from '../rippleui/pages/results/results-reducer-all';
import resultsGet from '../rippleui/pages/results/results-reducer-get';
import chart from '../rippleui/search/chart-reducer-get';
import documents from '../rippleui/pages/documents/documents-reducer-all';
import documentsFindDischarge from '../rippleui/pages/documents/documents-reducer-find-discharge';
import documentsFindReferral from '../rippleui/pages/documents/documents-reducer-find-referral';
import documentsUploadDischarge from '../rippleui/pages/documents/documents-reducer-upload-discharge';
import documentsUploadReferral from '../rippleui/pages/documents/documents-reducer-upload-referral';
import appointments from '../rippleui/pages/appointments/appointments-reducer-all';
import clinicalnotes from '../rippleui/pages/clinical-notes/clinicalnotes-reducer-all';
import studies from '../rippleui/pages/dicom/studies-reducer-all';
import series from '../rippleui/pages/dicom/series-reducer-all';
import instanceGet from '../rippleui/pages/dicom/instance-reducer-get';
import instanceIdGet from '../rippleui/pages/dicom/instance-id-reducer-get';
import eolcareplans from '../rippleui/pages/care-plans/eolcareplans-reducer-all';
import transferOfCare from '../rippleui/pages/transfer-of-care/transfer-of-care-reducer-all';
import transferOfCareGet from '../rippleui/pages/transfer-of-care/transfer-of-care-reducer-get';
import transferOfCareCreate from '../rippleui/pages/transfer-of-care/transfer-of-care-reducer-create';

export default combineReducers({
  patients,
  patientsGet,
  user, 
  search, 
  diagnoses,
  allergies,
  medication,
  contacts,
  orders,
  referrals,
  referralsGet,
  referralsCreate,
  referralsUpdate,
  procedures,
  proceduresGet,
  proceduresCreate,
  proceduresUpdate,
  results,
  resultsGet,
  chart,
  documents,
  documentsFindDischarge,
  documentsFindReferral,
  documentsUploadDischarge,
  documentsUploadReferral,
  appointments,
  clinicalnotes,
  heightAndWeight,
  cancermdt,
  studies,
  series,
  instanceGet,
  instanceIdGet,
  eolcareplans,
  transferOfCare,
  transferOfCareGet,
  transferOfCareCreate
});