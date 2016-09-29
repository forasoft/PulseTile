import { API_REQUEST } from 'app/helpers';

const LOGIN = 'redux/user/login';
const LOGIN_SUCCESS = 'redux/user/login_success';
const LOGIN_ERROR = 'redux/user/login_error';
const LOGIN_TYPES = [LOGIN, LOGIN_SUCCESS, LOGIN_ERROR];

const INCREASE = 'INCREASE';

const INITIAL_STATE = {
  me: null,
  count: 0
};

function checkHeader(action) {
  const { header } = action.meta;

  if (header.location) {
    window.location = header.location;
  }
}

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      checkHeader(action);
      return {
        ...state,
        me: action.payload
      };
    case INCREASE:
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
}

export function login() {
  return {
    [API_REQUEST]: {
      types: LOGIN_TYPES,
      config: {
        url: '/api/user'
      }
    }
  };
}

export function doIncrease() {
  return {
    type: INCREASE
  };
}
