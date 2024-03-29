import {
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  SET_WS_USER_CURRENT_ORDER
} from '../constants/wsUserFeed';
import type { TWSUserActions } from '../actions/wsUserFeed';
import type { IMessageResponse, TOrderItem } from '../types/types';

type TWSUserState = {
  wsConnected: boolean;
  messages: IMessageResponse[];
  error?: Event;
  currentOrder: TOrderItem | null,
}

const initialState: TWSUserState = {
  wsConnected: false,
  messages: [],
  currentOrder: null,
};

export const wsUserReducer = (state = initialState, action: TWSUserActions): TWSUserState => {
  switch (action.type) {
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_USER_GET_MESSAGE:
      const msg = { ...action.payload, timestamp: new Date().getTime() / 1000 };
      return {
        ...state,
        error: undefined,
        messages: [...state.messages, msg]
      };
    case SET_WS_USER_CURRENT_ORDER: {
        return {
          ...state,
          currentOrder: action.item,
        }
      }

    default:
      return state;
  }
};