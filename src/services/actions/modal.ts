import {
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants/modal'

export interface IOpenModal {
  readonly type: typeof OPEN_MODAL;
  readonly product: boolean;
  readonly order: boolean;
  readonly currentOrder: boolean;
}

export interface ICloseModal {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModal | ICloseModal

export const openModal = (product: boolean, order: boolean, currentOrder: boolean): IOpenModal => ({
  type: OPEN_MODAL,
  product,
  order,
  currentOrder,
})

export const closeModal = (): ICloseModal => ({
  type: CLOSE_MODAL,
})