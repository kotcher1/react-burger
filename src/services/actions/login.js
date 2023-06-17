import { loginRequest } from '../api.js'
import { setCookie } from '../utils';
import { getToken } from './user';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function login({name, email, password}) {
  return function(dispatch) {
    dispatch({
      type: 'LOGIN_REQUEST',
    });
    loginRequest({name, email, password})
    .then(res => res.json())
    .catch((err) => {
      dispatch({
        type: 'LOGIN_FAILED'
      });
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
        });
        dispatch({
          type: 'SET_USER_INFORMATION',
          name: res.user.name,
          email: res.user.email,
          accessToken: res.accessToken,
        })
        dispatch({
          type: "SET_PASSWORD",
          password,
        })
        setCookie('token', res.refreshToken)
        dispatch(getToken())
      } else {
        dispatch({
          type: 'LOGIN_FAILED'
        });
      }
    });
  }
};