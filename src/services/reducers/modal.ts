import {  
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../constants/modal'

import {
  TModalActions
} from '../actions/modal'


type TModalState = {
  productModalOpened: boolean,
  orderModalOpened: boolean,
  currentModalOpened: boolean,
}

const initialState: TModalState = {
  productModalOpened: false,
  orderModalOpened: false,
  currentModalOpened: false,
}


export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        productModalOpened: action.product,
        orderModalOpened: action.order,
        currentModalOpened: action.currentOrder,
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        productModalOpened: false,
        orderModalOpened: false,
        currentModalOpened: false,
      }
    }
    default: {
      return state;
    }
  }
}