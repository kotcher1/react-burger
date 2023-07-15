import { logoutRequest } from '../api'
import { deleteCookie, getCookie } from '../utils';

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from '../constants/logout'

import {
  setUserInformation,
  userLogout,
} from '../actions/user'

export interface IGetLogoutAction {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface IGetLogoutSuccessAction {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface IGetLogoutFailedAction {
  readonly type: typeof LOGOUT_FAILED;
}

export type TLogoutActions = IGetLogoutAction
  | IGetLogoutFailedAction
  | IGetLogoutSuccessAction

export const getLogoutRequestAction = (): IGetLogoutAction => ({
  type: LOGOUT_REQUEST,
});

export const getLogoutFailedAction = (): IGetLogoutFailedAction => ({
  type: LOGOUT_FAILED,
});

export const getLogoutSuccesAction = (): IGetLogoutSuccessAction => ({
  type: LOGOUT_SUCCESS,
});

export const logout = (): any => {
  return function(dispatch: any) {
    dispatch(getLogoutRequestAction());
    const token = getCookie('token')
    if(typeof token == 'string' && token) {
      logoutRequest(token)
      .then(res => res.json())
      .catch((err) => {
        dispatch(getLogoutFailedAction());
      })
      .then(res => {
        if (res && res.success) {
          dispatch(getLogoutSuccesAction());
          dispatch(setUserInformation('', '', ''))
          dispatch(userLogout())
          deleteCookie('token')
          deleteCookie('accessToken')
        } else {
          dispatch(getLogoutFailedAction());
        }
      });
    }
  }
};