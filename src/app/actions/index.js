import angular from 'angular';

import patientsActions from './patients';
import userActions from './user';
import searchActions from './search';
import messagesActions from './messages';
import searchReport from './search-report';
import diagnosesActions from './diagnoses';
import allergiesActions from './allergies';
import medicationsActions from './medications';
import contactsActions from './contacts';
import ordersActions from './orders';
import resultsActions from './results';

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
    .name;
