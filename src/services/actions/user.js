import { 
  forgotPasswordRequest, 
  changePasswordRequest, 
  getTokenRequest, 
  getUserRequest, 
  updateUserRequest 
} from '../api.js'
import { getCookie, setCookie, deleteCookie } from '../utils';

export const SET_USER_INFORMATION = 'SET_USER_INFORMATION'
export const PASSWORD_REQUEST = 'PASSWORD_REQUEST'
export const PASSWORD_RESET = 'PASSWORD_RESET'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_PASSWORD = 'SET_PASSWORD'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_SIGNIN = 'SET_SIGNIN'

export function getUser(accessToken) {
  return function(dispatch) {
    getUserRequest(accessToken)
    .then(res => res.json())
    .catch((err) => {
      if (err.message === "jwt expired") {
        getToken('getUser')
      }
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'SET_USER_INFORMATION',
          email: res.user.email,
          name: res.user.name,
        })
      }
    })
  }
}

export function changeUser(form, accessToken) {
  return function(dispatch) {
    updateUserRequest(form, accessToken)
    .then(res => res.json())
    .catch((err) => {
      if (err.message === "jwt expired") {
        getToken('changeUser')
      }
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'SET_PASSWORD',
          password: form.password
        });
        dispatch({
          type: 'SET_USER_INFORMATION',
          email: res.user.email,
          name: res.user.name,
        })
      }
    });
  }
}


export function forgotPassword(email) {
  return function(dispatch) {
    forgotPasswordRequest(email)
    .then(res => res.json())
    .catch((err) => {
      console.log(err)
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'PASSWORD_REQUEST',
        });
      }
    });
  }
};

export function resetPassword(form) {
  return function(dispatch) {
    changePasswordRequest(form)
    .then(res => res.json())
    .catch((err) => {
      console.log(err)
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'PASSWORD_RESET',
        });
      }
    });
  }
};

export function getToken(type) {
  return function(dispatch) {
    getTokenRequest({token: getCookie('token')})
    .then(res => res.json())
    .catch((err) => {
      console.log(err)
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'SET_TOKEN',
          accessToken: res.accessToken,
        });
        setCookie('token', res.refreshToken, {path: '/'})
        setCookie('accessToken', res.accessToken, {path: '/'})
        if(type === 'getUser') {
          dispatch(getUser(res.accessToken))
        } else if (type === 'changeUser') {
          dispatch(changeUser(res.accessToken))
        }
      }
    })
  }
}

