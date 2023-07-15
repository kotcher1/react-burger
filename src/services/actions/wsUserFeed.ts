import type { Middleware, MiddlewareAPI } from 'redux';

import type { TApplicationActions, AppDispatch, RootState } from '../types/index';
import type { TOrderItem, TWSUserStoreActions } from '../types/types';

import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE,
  SET_WS_USER_CURRENT_ORDER,
} from '../constants/wsUserFeed'

import { IMessageResponse, IMessage } from '../types/types';

export interface IWSConnectionStart {
  readonly type: typeof WS_USER_CONNECTION_START;
  readonly accessToken: string;
}

export interface ISetWSCurrentOrder {
  readonly type: typeof SET_WS_USER_CURRENT_ORDER;
  readonly item: TOrderItem;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_USER_GET_MESSAGE;
  readonly payload: IMessageResponse;
}

export interface IWSSendMessageAction {
  readonly type: typeof WS_USER_SEND_MESSAGE;
  readonly payload: {message: string};
}

export type TWSUserActions =
  IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction
  | ISetWSCurrentOrder;

export const socketUserMiddleware = (wsUserUrl: string, wsUserActions: TWSUserStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let wsFeedSocket: WebSocket | null = null;


    return next => (action: TApplicationActions) => {

      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsUserActions;
      if (type === wsInit) {
        //@ts-ignore
        if(action.accessToken) {
          //@ts-ignore
          const token = action.accessToken.includes('Bearer ') ? action.accessToken.slice(7) : action.accessToken.slice(9)
          wsFeedSocket = new WebSocket(`${wsUserUrl}?token=${token}`);
        }

      }
      if (wsFeedSocket) {
        wsFeedSocket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };
        wsFeedSocket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };
        wsFeedSocket.onmessage = event => {
          const { data } = event;
          const parsedData: IMessageResponse = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: {...restParsedData} });
        };
        wsFeedSocket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const payload = action.payload;
          const message = { ...(payload as IMessage) };
          wsFeedSocket.send(JSON.stringify(message));
        }

        next(action);
      }
    }
  }) as Middleware;
}

