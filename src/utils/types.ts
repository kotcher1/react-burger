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

export type TStore = {
  readonly _id?: string;
  readonly name?: string;
  readonly type?: string;
  readonly proteins?: number;
  readonly fat?: number;
  readonly __v?: number;
  readonly calories?: number;
  readonly carbohydrates?: number;
  readonly image_large?: string;
  readonly image_mobile?: string;
  readonly image: string;
  readonly price?: number;
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
  success: boolean;

  message?: string;
  accessToken?: string;
  refreshToken?: string;
};

export type TUser = {
  readonly email: string;
  readonly name: string;
};

