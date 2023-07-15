import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from '../constants/wsFeed'

import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_ERROR,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_MESSAGE,
  WS_USER_SEND_MESSAGE,
} from '../constants/wsUserFeed'

export type TItem = {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly __v: number;
  readonly calories: number;
  readonly carbohydrates: number;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly price: number;
  readonly image: string;
};

export interface CustomResponse<T> extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): any;
}

export type TResponseBody = {
  readonly success: boolean;

  readonly message?: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
};

export type TUser = {
  readonly email: string;
  readonly name: string;
};

export type TOrder = {
  readonly name?: string;
  readonly order?: {number: number}
}

export type TWSStoreActions = {
  wsInit: typeof  WS_CONNECTION_START;
  wsSendMessage: typeof  WS_SEND_MESSAGE;
  onOpen: typeof  WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof  WS_CONNECTION_ERROR;
  onMessage: typeof  WS_GET_MESSAGE;
};
export type TWSUserStoreActions = {
  wsInit: typeof  WS_USER_CONNECTION_START;
  wsSendMessage: typeof  WS_USER_SEND_MESSAGE;
  onOpen: typeof  WS_USER_CONNECTION_SUCCESS;
  onClose: typeof WS_USER_CONNECTION_CLOSED;
  onError: typeof  WS_USER_CONNECTION_ERROR;
  onMessage: typeof  WS_USER_GET_MESSAGE;
};

export interface IMessageResponse {
  message?: string;
  success?: boolean;

  id?: string;
  isBot?: boolean;
}

export type TOrderItem = {
  readonly ingredients: string[];
  readonly _id: string,
  readonly status: string,
  readonly createdAt: string,
  readonly updatedAt: string,
  readonly name: string,
  readonly number: number,
}

export type TAllOrdersItem<T> = {
  readonly orders: T[],
  readonly timestamp: string,
  readonly total: string,
  readonly totalToday: string,
}

export interface IMessage extends Omit<IMessageResponse, 'success'> {
  timestamp: number;
}

