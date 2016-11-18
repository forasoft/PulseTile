/*
  ~  Copyright 2016 Ripple Foundation C.I.C. Ltd
  ~  
  ~  Licensed under the Apache License, Version 2.0 (the "License");
  ~  you may not use this file except in compliance with the License.
  ~  You may obtain a copy of the License at
  ~  
  ~    http://www.apache.org/licenses/LICENSE-2.0

  ~  Unless required by applicable law or agreed to in writing, software
  ~  distributed under the License is distributed on an "AS IS" BASIS,
  ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~  See the License for the specific language governing permissions and
  ~  limitations under the License.
*/
import * as types from '../../../constants/ActionTypes';

const INITIAL_STATE = {
  isFetching: false,
  error: false,
  data: null,
  dataGet: null,
  dataCreate: null,
  dataUpdate: null
};

export default function appointments(state = INITIAL_STATE, action) {
  const {payload} = action;

  var actions = {
    [types.APPOINTMENTS]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.APPOINTMENTS_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        data: payload.response
      });
    },
    [types.APPOINTMENTS_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.APPOINTMENTS_GET]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.APPOINTMENTS_GET_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataGet: payload.response
      });
    },
    [types.APPOINTMENTS_GET_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.APPOINTMENTS_CREATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.APPOINTMENTS_CREATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataCreate: payload.response
      });
    },
    [types.APPOINTMENTS_CREATE_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    },
    [types.APPOINTMENTS_UPDATE]: (state) => {
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      });
    },
    [types.APPOINTMENTS_UPDATE_SUCCESS]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        dataUpdate: payload.response
      });
    },
    [types.APPOINTMENTS_UPDATE_ERROR]: (state) => {
      return Object.assign({}, state, {
        isFetching: false,
        error: payload.error
      });
    }
  };

  return actions[action.type] ?
    actions[action.type](state) :
    state;
}