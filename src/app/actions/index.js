import angular from 'angular';

import patientsActions from './patients';
import userActions from './user';
import searchActions from './search';

export default angular
    .module('app.actions', [])
    .factory('patientsActions', patientsActions)
    .factory('userActions', userActions)
    .factory('searchActions', searchActions)
    .name;
