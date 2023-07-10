import {
  GET_ORDER_ID_REQUEST,
  GET_ORDER_ID_SUCCESS,
  GET_ORDER_ID_FAILED,
  RESET_ORDER,
} from '../constants/order'

import { TItem } from '../../utils/types'
import { setOrder } from '../api';

export interface IGetOrderIdRequest {
  readonly type: typeof GET_ORDER_ID_REQUEST;
}

export interface IGetOrderIdSuccess {
  readonly type: typeof GET_ORDER_ID_SUCCESS;
}

export interface IGetOrderIdFailed {
  readonly type: typeof GET_ORDER_ID_FAILED;
}

export const getOrderIdRequest = (): IGetOrderIdRequest => ({
  type: GET_ORDER_ID_REQUEST,
});

export const getOrderIdSuccess = (): IGetOrderIdSuccess => ({
  type: GET_ORDER_ID_SUCCESS,
});

export const getOrderIdFailed = (): IGetOrderIdFailed => ({
  type: GET_ORDER_ID_FAILED,
});

export function addId(ingredients: Array<TItem>): any {
  return function(dispatch) {
    dispatch(getOrderIdRequest());
    setOrder(ingredients, dispatch(getOrderIdFailed()))
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_ID_SUCCESS,
          order: res,
        });
      } else {
        dispatch({
          type: GET_ORDER_ID_FAILED
        });
      }
    });
  }
};
