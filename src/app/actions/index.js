import angular from 'angular';

import patientsActions from './patients';
import userActions from './user';
import messagesActions from './messages';

export default angular
    .module('app.actions', [])
    .factory('patientsActions', patientsActions)
    .factory('userActions', userActions)
    .factory('messagesActions', messagesActions)
    .name;
