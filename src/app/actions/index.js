import angular from 'angular';

import patientsActions from './patients';
import userActions from './user';

export default angular
    .module('app.actions', [])
    .factory('patientsActions', patientsActions)
    .factory('userActions', userActions)
    .name;
