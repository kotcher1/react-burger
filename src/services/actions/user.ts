import { 
  forgotPasswordRequest, 
  changePasswordRequest, 
  getTokenRequest, 
  getUserRequest, 
  updateUserRequest 
} from '../api'
import { getCookie, setCookie } from '../utils';

import {
  SET_USER_INFORMATION,
  PASSWORD_REQUEST,
  PASSWORD_RESET,
  USER_LOGOUT,
  SET_PASSWORD,
  SET_TOKEN,
  SET_SIGNIN,
} from '../constants/user'

export interface ISetUserInformation {
  readonly type: typeof SET_USER_INFORMATION;
  readonly name: string,
  readonly email: string,
  readonly accessToken: string,
}

export interface ISetPassword {
  readonly type: typeof SET_PASSWORD;
  readonly password: string,
}

export interface IUserLogout {
  readonly type: typeof USER_LOGOUT;
}

export const setUserInformation = (name: string, email: string, accessToken: string): ISetUserInformation => ({
  type: SET_USER_INFORMATION,
  name,
  email,
  accessToken,
});

export const setPassword = (password: string): ISetPassword => ({
  type: SET_PASSWORD,
  password,
})

export const userLogout = (): IUserLogout => ({
  type: USER_LOGOUT,
})

export function getUser(accessToken: string): any {
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

