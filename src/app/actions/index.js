import angular from 'angular';

import patientsActions from '../rippleui/pages/patients-list/patients-actions';
import userActions from './user';
import searchActions from '../rippleui/search/search-actions';
import messagesActions from './messages';
import searchReport from '../rippleui/search/search-report-actions';
import diagnosesActions from '../rippleui/pages/diagnoses/diagnoses-actions';
import allergiesActions from '../rippleui/pages/allergies/allergies-actions';
import medicationsActions from '../rippleui/pages/medications/medications-actions';
import contactsActions from '../rippleui/pages/contacts/contacts-actions';
import ordersActions from '../rippleui/pages/orders/orders-actions';
import resultsActions from '../rippleui/pages/results/results-actions';
import referralsActions from '../rippleui/pages/referrals/referrals-actions';
import proceduresActions from '../rippleui/pages/procedures/procedures-actions';
import documentsActions from '../rippleui/pages/documents/documents-actions';
import cancermdtActions from '../rippleui/pages/cancer-mdt/cancer-mdt-actions';

export default angular
    .module('app.actions', [])
    .factory('patientsActions', patientsActions)
    .factory('userActions', userActions)
    .factory('searchActions', searchActions)
    .factory('messagesActions', messagesActions)
    .factory('searchReport', searchReport)
    .factory('diagnosesActions', diagnosesActions)
    .factory('allergiesActions', allergiesActions)
    .factory('medicationsActions', medicationsActions)
    .factory('contactsActions', contactsActions)
    .factory('ordersActions', ordersActions)
    .factory('resultsActions', resultsActions)
    .factory('referralsActions', referralsActions)
    .factory('proceduresActions', proceduresActions)
    .factory('documentsActions', documentsActions)
    .factory('cancermdtActions', cancermdtActions)
    .name;
