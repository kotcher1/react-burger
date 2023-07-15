import { loginRequest } from '../api'
import { setCookie } from '../utils';
import {
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILED
} from '../constants/login'
import {
  setUserInformation,
  setPassword,
} from '../actions/user'

import { AppDispatch } from '../types/index'

export interface IGetLoginAction {
  readonly type: typeof LOGIN_REQUEST;
}

export interface IGetLoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
}

export interface IGetLoginFailedAction {
  readonly type: typeof LOGIN_FAILED;
}

export type TLoginActions = IGetLoginAction
  | IGetLoginFailedAction
  | IGetLoginSuccessAction

export const getLoginRequestAction = (): IGetLoginAction => ({
  type: LOGIN_REQUEST,
});

export const getLoginFailedAction = (): IGetLoginFailedAction => ({
  type: LOGIN_FAILED,
});

export const getLoginSuccesAction = (): IGetLoginSuccessAction => ({
  type: LOGIN_SUCCESS,
});

export const login = ({email, password}: {email: string, password: string}): any => {
  return function(dispatch: AppDispatch) {
    dispatch(getLoginRequestAction());
    loginRequest({email, password})
    .then(res => res.json())
    .catch((err) => {
      dispatch(getLoginFailedAction());
    })
    .then(res => {
      if (res && res.success) {
        dispatch(getLoginSuccesAction());
        dispatch(setUserInformation(res.user.name, res.user.email, res.accessToken))
        dispatch(setPassword(password))
        setCookie('token', res.refreshToken, {path: '/'})
        setCookie('accessToken', res.accessToken, {path: '/'})
      } else {
        dispatch(getLoginFailedAction());
      }
    });
  }
};