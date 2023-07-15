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

export interface IPasswordRequest {
  readonly type: typeof PASSWORD_REQUEST;
}

export interface IPasswordReset {
  readonly type: typeof PASSWORD_RESET;
}

export interface ISetSignin {
  readonly type: typeof SET_SIGNIN;
}

export type TUserActions = ISetUserInformation
  | ISetPassword
  | IUserLogout
  | IPasswordRequest
  | IPasswordReset
  | ISetSignin

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

export const passwordRequest = (): IPasswordRequest => ({
  type: PASSWORD_REQUEST,
})

export const passwordReset = (): IPasswordReset => ({
  type: PASSWORD_RESET,
})

export const setSignin = (): ISetSignin => ({
  type: SET_SIGNIN,
})

export const getUser = (accessToken: string): any => {
  return function(dispatch: any) {
    fetchWithRefresh(getUserRequest, accessToken)
    .catch((err) => {
      console.log(err)
    })
    .then(res => {
      if (res && res.success) {
        const accessToken = getCookie('accessToken');
        if (typeof accessToken == 'string' && accessToken) {
          dispatch(setUserInformation(res.user.name, res.user.email, accessToken))
        }
      }
    })
  }
}

export const changeUser = (form: {name: string, email: string, password: string}, accessToken: string): any => {
  return function(dispatch: any) {
    fetchWithRefresh(updateUserRequest, accessToken, form)
    .catch((err) => {
      console.log(err)
    })
    .then(res => {
      if (res && res.success) {
        dispatch(setPassword(form.password));
        const accessToken = getCookie('accessToken');
        if (typeof accessToken == 'string' && accessToken) {
          setUserInformation(res.user.name, res.user.email, accessToken)
        }
      }
    });
  }
}


export const forgotPassword = (email: string): any => {
  return function(dispatch: any) {
    forgotPasswordRequest(email)
    .then(res => res.json())
    .catch((err) => {
      console.log(err)
    })
    .then(res => {
      if (res && res.success) {
        dispatch(passwordRequest());
      }
    });
  }
};

export const resetPassword = (form: {password: string, token: string}): any => {
  return function(dispatch: any) {
    changePasswordRequest(form)
    .then(res => res.json())
    .catch((err) => {
      console.log(err)
    })
    .then(res => {
      if (res && res.success) {
        dispatch(passwordReset());
      }
    });
  }
};

const checkResponse = (res: any) => {
  return res.ok ? res.json() : res.json().then((err: any) => Promise.reject(err));
};

const fetchWithRefresh = async (fc: any, accessToken: string, form?: {email: string, name: string, password: string}) => {
  try {
    const res = await fc(accessToken, form);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const cookie = getCookie('token')
      if (cookie && typeof cookie === 'string') {
        const refreshData = await getTokenRequest({token: cookie});
        //@ts-ignore
        setCookie('token', refreshData.refreshToken, {path: '/'})
        //@ts-ignore
        setCookie('accessToken', refreshData.accessToken, {path: '/'})
        //@ts-ignore
        const res = await fc(refreshData.accessToken, form);
        return await checkResponse(res);
      }
    } else {
      return Promise.reject(err);
    }
  }
};

