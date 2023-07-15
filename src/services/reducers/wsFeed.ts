import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  SET_WS_CURRENT_ORDER,
} from '../constants/wsFeed';
import type { TWSActions } from '../actions/wsFeed';
import type { IMessageResponse, TOrderItem } from '../types/types';

type TWSState = {
  wsConnected: boolean;
  messages: IMessageResponse[];
  currentOrder: TOrderItem | null,
  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  messages: [],
  currentOrder: null,
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      const msg = { ...action.payload, timestamp: new Date().getTime() / 1000 };
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, msg]
      };
    case   SET_WS_CURRENT_ORDER: {
      return {
        ...state,
        currentOrder: action.item,
      }
    }
    default:
      return state;
  }
};