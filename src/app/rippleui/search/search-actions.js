import {bindActionCreators} from 'redux';
import * as types from '../../constants/ActionTypes';

export function advancedSearch(queryParams) {
    return {
        // Types of actions to emit before and after
        types: [types.SEARCH, types.SEARCH_SUCCESS, types.SEARCH_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.advancedSearch,

        // Configure $http
        config: {
            method: 'post',
            url: `api/patients/advancedSearch`,
            data: queryParams
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export default function searchActions($ngRedux) {
    let actionCreator = {
        advancedSearch
    };

    return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

searchActions.$inject = ['$ngRedux'];