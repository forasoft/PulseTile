import {bindActionCreators} from 'redux';
import * as types from '../constants/ActionTypes';

export function loadPatients() {
    return {
        // Types of actions to emit before and after
        types: [types.PATIENTS_LIST, types.PATIENTS_LIST_SUCCESS, types.PATIENTS_LIST_ERROR],
    
        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patients.response,
    
        // Configure $http
        config: {
            method: 'get',
            url: `api/patients`
        },
    
        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export function getPatient(id) {
    return {
        // Types of actions to emit before and after
        types: [types.PATIENTS_LIST, types.PATIENTS_LIST_SUCCESS, types.PATIENTS_LIST_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patients.response,

        // Configure $http
        config: {
            method: 'get',
            url: 'api/patients/'+id
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export default function patientsActions($ngRedux) {
    let actionCreator = {
        loadPatients,
        getPatient
    };

    return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

patientsActions.$inject = ['$ngRedux'];