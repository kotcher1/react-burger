import {  
  SET_USER_INFORMATION,
  PASSWORD_REQUEST,
  PASSWORD_RESET,
  USER_LOGOUT,
  SET_PASSWORD,
  SET_SIGNIN,
} from '../constants/user'

import {
  TUserActions
} from '../actions/user'

type TUserState = {
  email: string,
  name: string,
  accessToken: string,
  signIn: boolean,
  passwordRequest: boolean,
  passwordReset: boolean,
  password: string,
}

const initialState: TUserState = {
  email: '',
  name: '',
  accessToken: '',
  signIn: false,
  passwordRequest: false,
  passwordReset: false,
  password: '',
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
  switch (action.type) {
    case SET_USER_INFORMATION: {
      return {
        ...state,
        email: action.email,
        name: action.name,
        accessToken: action.accessToken,
        signIn: true,
      }
    }
    case SET_PASSWORD: {
      return {
        ...state,
        password: action.password,
      }
    }
    case PASSWORD_REQUEST: {
      return {
        ...state,
        passwordRequest: true,
        passwordReset: false,
      }
    }
    case PASSWORD_RESET: {
      return {
        ...state,
        passwordReset: true,
        passwordRequest: false,
      }
    }
    case USER_LOGOUT: {
      return {
        ...state,
        signIn: false,
      }
    }
    case SET_SIGNIN: {
      return {
        ...state,
      }
    }
    default: {
      return state;
    }
  }
}