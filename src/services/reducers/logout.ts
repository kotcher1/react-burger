import {  
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from '../constants/logout'

import {
  TLogoutActions,
} from '../actions/logout'

type TLogoutState = {
  logoutRequest: boolean,
  logoutFailed: boolean,
}

const initialState: TLogoutState = {
  logoutRequest: false,
  logoutFailed: false,
}

export const logoutReducer = (state = initialState, action: TLogoutActions): TLogoutState => {
  switch (action.type) {
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: false,
      }
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}