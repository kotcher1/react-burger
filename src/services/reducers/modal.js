import {  
  OPEN_MODAL,
  CLOSE_MODAL,
} from '../actions/modal'

const initialState = {
  productModalOpened: false,
  orderModalOpened: false,
}


export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        productModalOpened: action.product,
        orderModalOpened: action.order,
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        productModalOpened: false,
        orderModalOpened: false,
      }
    }
    default: {
      return state;
    }
  }
}