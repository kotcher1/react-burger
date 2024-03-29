import {
  GET_ORDER_ID_REQUEST,
  GET_ORDER_ID_SUCCESS,
  GET_ORDER_ID_FAILED,
  RESET_ORDER,
} from '../constants/order'

import {
  TOrder,
  TResponseBody,
} from '../types/types'

import { setOrder } from '../api';

import { AppDispatch } from '../types/index'

export interface IGetOrderIdRequest {
  readonly type: typeof GET_ORDER_ID_REQUEST;
}

export interface IGetOrderIdSuccess {
  readonly type: typeof GET_ORDER_ID_SUCCESS;
  readonly order: TOrder & TResponseBody;
}

export interface IGetOrderIdFailed {
  readonly type: typeof GET_ORDER_ID_FAILED;
}

export interface IResetOrder {
  readonly type: typeof RESET_ORDER;
}

export type TOrderActions = IGetOrderIdRequest
  | IGetOrderIdSuccess
  | IGetOrderIdFailed
  | IResetOrder

export const getOrderIdRequest = (): IGetOrderIdRequest => ({
  type: GET_ORDER_ID_REQUEST,
});

export const getOrderIdSuccess = (order: TOrder & TResponseBody): IGetOrderIdSuccess => ({
  type: GET_ORDER_ID_SUCCESS,
  order,
});

export const getOrderIdFailed = (): IGetOrderIdFailed => ({
  type: GET_ORDER_ID_FAILED,
});

export const resetOrder = (): IResetOrder => ({
  type: RESET_ORDER,
});

export const addId = (ingredients: Array<String>): any => {
  return function(dispatch: AppDispatch) {
    dispatch(getOrderIdRequest());
    setOrder(ingredients)
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        dispatch(getOrderIdSuccess(res));
      } else {
        dispatch(getOrderIdFailed());
      }
    })
    .catch(err => dispatch(getOrderIdFailed()))
  }
};
