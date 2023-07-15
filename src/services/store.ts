import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './actions/wsFeed';
import { socketUserMiddleware } from './actions/wsUserFeed';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from './constants/wsFeed'

import type { TWSStoreActions, TWSUserStoreActions } from "./types/types";

const wsUrl: string = 'wss://norma.nomoreparties.space/orders/all';
const wsUserUrl: string = 'wss://norma.nomoreparties.space/orders';

const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const wsUserActions: TWSUserStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, socketMiddleware(wsUrl, wsActions), socketUserMiddleware(wsUserUrl, wsUserActions)))
);