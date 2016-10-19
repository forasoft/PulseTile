import * as types from '../../constants/ActionTypes';

const INITIAL_STATE = {
    isFetching: false,
    error: false,
    data: null
};

export default function posts(state = INITIAL_STATE, action) {
    const {payload} = action;

    var actions = {
        [types.CHART]: (state) => {
            return Object.assign({}, state, {
                isFetching: true,
                error: false
            });
        },
        [types.CHART_SUCCESS]: (state) => {
            return Object.assign({}, state, {
                isFetching: false,
                data: payload.response
            });
        },
        [types.CHART_ERROR]: (state) => {
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