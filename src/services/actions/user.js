import { 
  forgotPasswordRequest, 
  changePasswordRequest, 
  getTokenRequest, 
  getUserRequest, 
  updateUserRequest 
} from '../api'
import { getCookie, setCookie } from '../utils';

export const SET_USER_INFORMATION = 'SET_USER_INFORMATION'
export const PASSWORD_REQUEST = 'PASSWORD_REQUEST'
export const PASSWORD_RESET = 'PASSWORD_RESET'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_PASSWORD = 'SET_PASSWORD'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_SIGNIN = 'SET_SIGNIN'

export function getUser(accessToken) {
  return function(dispatch) {
    fetchWithRefresh(getUserRequest, accessToken)
    .catch((err) => {
      console.log(err)
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: 'SET_USER_INFORMATION',
          email: res.user.email,
          name: res.user.name,
        })
        dispatch({
          type: 'SET_TOKEN',
          accessToken: getCookie('accessToken'),
        });
      }
    })
  }
}

export function changeUser(form, accessToken) {
  return function(dispatch) {
    fetchWithRefresh(updateUserRequest, accessToken, form)
    .catch((err) => {
      console.log(err)
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
        dispatch({
          type: 'SET_TOKEN',
          accessToken: getCookie('accessToken'),
        });
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

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchWithRefresh = async (fc, accessToken, form = {}) => {
  try {
    const res = await fc(accessToken, form);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await getTokenRequest({token: getCookie('token')});
      setCookie('token', refreshData.refreshToken, {path: '/'})
      setCookie('accessToken', refreshData.accessToken, {path: '/'})
      const res = await fc(refreshData.accessToken, form);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

