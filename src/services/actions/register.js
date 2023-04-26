import { createUser } from '../api.js'
import { Navigate } from 'react-router-dom'

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const SET_USER_INFORMATION = 'SET_USER_INFORMATION'

export function register(name, email, password) {
  return function(dispatch) {
    dispatch({
      type: 'REGISTER_REQUEST',
    });
    createUser(name, email, password)
    .catch((err) => {
      dispatch({
        type: REGISTER_FAILED
      });
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'REGISTER_SUCCESS',
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        });
      } else {
        dispatch({
          type: 'REGISTER_FAILED'
        });
      }
    });
  }
};