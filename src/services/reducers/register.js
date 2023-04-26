import {  
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  SET_USER_INFORMATION,
} from '../actions/register'

const initialState = {
  registerRequest: false,
  regiterFailed: false,
  email: '',
  name: '',
  password: '',
  accessToken: '',
  refreshToken: '',
}

export const registerReducer = (state = initialState, action) => {
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
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
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
    case SET_USER_INFORMATION: {
      return {
        ...state,
        email: action.email,
        name: action.name,
        password: action.password,
      }
    }
    default: {
      return state;
    }
  }
}