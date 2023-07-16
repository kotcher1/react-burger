import type { Middleware, MiddlewareAPI } from 'redux';

import type { TApplicationActions, AppDispatch, RootState } from '../types/index';
import type { TOrderItem, TWSStoreActions } from '../types/types';

import { addIngredients } from './products';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  SET_WS_CURRENT_ORDER,
} from '../constants/wsFeed'

import { IMessageResponse, IMessage } from '../types/types';
import { nextTick } from 'process';

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface ISetWSCurrentOrder {
  readonly type: typeof SET_WS_CURRENT_ORDER;
  readonly item: TOrderItem | null;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IMessageResponse;
}

export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: {message: string};
}

export type TWSActions =
  IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction
  | ISetWSCurrentOrder;

export const setWSCurrentOrder = (item: TOrderItem): ISetWSCurrentOrder => ({
  type: SET_WS_CURRENT_ORDER,
  item,
})

export const socketMiddleware = (wsUrl: string, wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let wsFeedSocket: WebSocket | null = null;


    return next => (action: TApplicationActions) => {
      

      const { dispatch } = store;

      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        wsFeedSocket = new WebSocket(`${wsUrl}`);
      }
      if (wsFeedSocket) {
        if(type === onClose) {
          wsFeedSocket.onopen = event => {
            dispatch({ type: onOpen, payload: event });
          };
        }
        if(type === onClose) {
          wsFeedSocket.close(1000, 'feed connection closed by client')
        }
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
    return
  }) as Middleware;
}

