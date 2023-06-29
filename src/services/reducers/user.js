import {  
  SET_USER_INFORMATION,
  PASSWORD_REQUEST,
  PASSWORD_RESET,
  USER_LOGOUT,
  SET_PASSWORD,
  SET_TOKEN,
  SET_SIGNIN,
} from '../actions/user'

const initialState = {
  email: '',
  name: '',
  accessToken: '',
  signIn: false,
  passwordRequest: false,
  passwordReset: false,
  password: '',
}

export const userReducer = (state = initialState, action) => {
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
    case SET_TOKEN: {
      return {
        ...state,
        accessToken: action.accessToken,
      }
    }
    case SET_SIGNIN: {
      return {
        ...state,
        accessToken: action.accessToken,
      }
    }
    default: {
      return state;
    }
  }
}