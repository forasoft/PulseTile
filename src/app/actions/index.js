import angular from 'angular';

import patientsActions from './patients';
import userActions from './user';
import searchActions from './search';
import messagesActions from './messages';
import searchReport from './search-report';
import diagnosesActions from './diagnoses';
import allergiesActions from './allergies';
import contactsActions from './contacts';

export default angular
    .module('app.actions', [])
    .factory('patientsActions', patientsActions)
    .factory('userActions', userActions)
    .factory('searchActions', searchActions)
    .factory('messagesActions', messagesActions)
    .factory('searchReport', searchReport)
    .factory('diagnosesActions', diagnosesActions)
    .factory('allergiesActions', allergiesActions)
    .factory('contactsActions', contactsActions)
    .name;
