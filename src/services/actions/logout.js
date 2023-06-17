import { logoutRequest } from '../api.js'
import { deleteCookie, getCookie } from '../utils';
import { stopInterval } from './user';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function logout() {
  return function(dispatch) {
    dispatch({
      type: 'LOGOUT_REQUEST',
    });
    logoutRequest(getCookie('token'))
    .then(res => res.json())
    .catch((err) => {
      dispatch({
        type: 'LOGOUT_FAILED'
      });
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'LOGOUT_SUCCESS',
        });
        dispatch({
          type: 'SET_USER_INFORMATION',
          name: '',
          email: '',
          accessToken: '',
        })
        dispatch({
          type: 'USER_LOGOUT',
        })
        deleteCookie('token')
        stopInterval()
      } else {
        dispatch({
          type: 'LOGOUT_FAILED'
        });
      }
    });
  }
};