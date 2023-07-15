import {  
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from '../constants/register'

import {
  TRegisterActions
} from '../actions/register'

type TRegisterStore = {
  registerRequest: boolean;
  registerFailed: boolean;
}

const initialState: TRegisterStore = {
  registerRequest: false,
  registerFailed: false,
}

export const registerReducer = (state = initialState, action: TRegisterActions): TRegisterStore => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: false,
      }
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}