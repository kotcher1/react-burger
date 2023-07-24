import { createUser } from '../api'
import { setCookie } from '../utils';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../constants/register'

import {
  setUserInformation,
  setPassword,
} from './user'

import { AppDispatch } from '../types/index'

export interface IGetRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IGetRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
}

export interface IGetRegisterFailed {
  readonly type: typeof REGISTER_FAILED;
}

export type TRegisterActions = IGetRegisterRequest
  | IGetRegisterSuccess
  | IGetRegisterFailed

export const getRegisterSuccess = (): IGetRegisterSuccess => ({
  type: REGISTER_SUCCESS,
});

export const getRegisterFailed = (): IGetRegisterFailed => ({
  type: REGISTER_FAILED,
});

export const getRegisterRequest = (): IGetRegisterRequest => ({
  type: REGISTER_REQUEST,
});

export const register = ({name, email, password}: {name: string, email: string, password: string}): any => {
  return function(dispatch: AppDispatch) {
    dispatch(getRegisterRequest());
    createUser({name, email, password})
    .then(res => res.json())
    .catch((err) => {
      dispatch(getRegisterFailed());
    })
    .then(res => {
      if (res && res.success) {
        dispatch(getRegisterSuccess());
        setCookie('token', res.refreshToken, {path: '/'})
        setCookie('accessToken', res.accessToken, {path: '/'})
        dispatch(setUserInformation(res.user.name, res.user.email, res.accessToken))
        dispatch(setPassword(password))
      } else {
        dispatch(getRegisterFailed());
      }
    });
  }
};