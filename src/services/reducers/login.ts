import {  
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from '../constants/login'

import {
  TLoginActions,
} from '../actions/login'

type TLoginState = {
  loginRequest: boolean;
  loginFailed: boolean;
}

const initialState: TLoginState = {
  loginRequest: false,
  loginFailed: false,
}

export const loginReducer = (state = initialState, action: TLoginActions): TLoginState => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: false,
      }
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}