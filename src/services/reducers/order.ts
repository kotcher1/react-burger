import {  
  GET_ORDER_ID_REQUEST,
  GET_ORDER_ID_SUCCESS,
  GET_ORDER_ID_FAILED,
  RESET_ORDER,
} from '../constants/order'

import {
  TOrderActions
} from '../actions/order'
import { TOrder } from '../types/types'

type TOrderState = {
  orderRequest: boolean,
  orderFailed: boolean,
  order: TOrder,
}

const initialState: TOrderState = {
  orderRequest: false,
  orderFailed: false,
  order: {},
}


export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
  switch (action.type) {
    case GET_ORDER_ID_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      }
    }
    case GET_ORDER_ID_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderFailed: false,
      }
    }
    case GET_ORDER_ID_FAILED: {
      return {
        ...state,
        order: {},
        orderRequest: false,
        orderFailed: true,
      }
    }
    case RESET_ORDER: {
      return {
        ...state,
        order: {},
      }
    }
    default: {
      return state;
    }
  }
}