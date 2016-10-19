import {bindActionCreators} from 'redux';
import * as types from '../../constants/ActionTypes';

export function getTable(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.SEARCH, types.SEARCH_SUCCESS, types.SEARCH_ERROR],
    
        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientDetails,
    
        // Configure $http
        config: {
            method: 'post',
            url: `/api/search/reports/table`,
            data: queryParams
        },
    
        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export function getSettingsTable(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.SEARCH, types.SEARCH_SUCCESS, types.SEARCH_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientDetails,

        // Configure $http
        config: {
            method: 'post',
            url: '/api/search/setting/table',
            data: queryParams
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export function getChart(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.CHART, types.CHART_SUCCESS, types.CHART_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientDetails,

        // Configure $http
        config: {
            method: 'post',
            url: '/api/search/reports/chart',
            data: queryParams
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export function searchByPatient(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.SEARCH, types.SEARCH_SUCCESS, types.SEARCH_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patientDetails,

        // Configure $http
        config: {
            method: 'post',
            url: '/api/search/patient/table',
            data: queryParams
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export default function searchReport($ngRedux) {
    let actionCreator = {
        getChart,
        getTable,
        getSettingsTable,
        searchByPatient
    };

    return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

searchReport.$inject = ['$ngRedux'];