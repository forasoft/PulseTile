import angular from 'angular';

import patientsActions from './patients';

export default angular
    .module('app.actions', [])
    .factory('patientsActions', patientsActions)
    .name;
