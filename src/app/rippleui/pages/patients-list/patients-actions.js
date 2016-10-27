import {bindActionCreators} from 'redux';
import * as types from '../../../constants/ActionTypes';

export function loadPatients() {
    return {
        // Types of actions to emit before and after
        types: [types.PATIENTS, types.PATIENTS_SUCCESS, types.PATIENTS_ERROR],
    
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
        types: [types.PATIENTS_GET, types.PATIENTS_GET_SUCCESS, types.PATIENTS_GET_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientsGet.response,

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