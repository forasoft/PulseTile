import * as types from '../../../constants/ActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    error: false,
    data: null
};

export default function posts(state = INITIAL_STATE, action) {
    const {payload} = action;

    var actions = {
        [types.PATIENTS_LIST]: (state) => {
            return Object.assign({}, state, {
                isFetching: true,
                error: false
            });
        },
        [types.PATIENTS_LIST_SUCCESS]: (state) => {
            return Object.assign({}, state, {
                isFetching: false,
                data: payload.response
            });
        },
        [types.PATIENTS_LIST_ERROR]: (state) => {
            return Object.assign({}, state, {
                isFetching: false,
                error: payload.error
            });
        },
    };

    return actions[action.type] ?
        actions[action.type](state) :
        state;
}