import {bindActionCreators} from 'redux';
import * as types from '../constants/ActionTypes';

export function login() {
    return {
        // Types of actions to emit before and after
        types: [types.USER_LOGIN, types.USER_LOGIN_SUCCESS, types.USER_LOGIN_ERROR],

        // Check the cache (optional):
        shouldCallAPI: (state) => !state.patients.response,

        // Configure $http
        config: {
            method: 'get',
            url: '/api/user'
        },

        // Metadata to inject in begin/end actions
        meta: {
            timestamp: Date.now()
        }
    };
}

export default function userActions($ngRedux) {
    let actionCreator = {
        login
    };

    return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

userActions.$inject = ['$ngRedux'];