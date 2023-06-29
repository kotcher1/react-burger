import { createUser } from '../api.js'
import { setCookie } from '../utils';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

export function register({name, email, password}) {
  return function(dispatch) {
    dispatch({
      type: 'REGISTER_REQUEST',
    });
    createUser({name, email, password})
    .then(res => res.json())
    .catch((err) => {
      console.log(err)
      dispatch({
        type: 'REGISTER_FAILED'
      });
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'REGISTER_SUCCESS',
        });
        setCookie('token', res.refreshToken, {path: '/'})
        setCookie('accessToken', res.accessToken, {path: '/'})
        dispatch({
          type: 'SET_USER_INFORMATION',
          email: res.user.email,
          name: res.user.name,
          accessToken: res.accessToken,
        })
        dispatch({
          type: "SET_PASSWORD",
          password,
        })
      } else {
        dispatch({
          type: 'REGISTER_FAILED'
        });
      }
    });
  }
};