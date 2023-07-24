import { LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS } from '../constants/logout'
import { logoutReducer } from './logout.ts'

describe('logout reducer', () => {
  it('should return initial state', () => {
    expect(logoutReducer(undefined, {})).toEqual(
      {
        logoutRequest: false,
        logoutFailed: false,
      }
    )
  })

  it('should handle LOGOUT_REQUEST', () => {
    expect(logoutReducer({
      logoutRequest: false,
      logoutFailed: false,
    }, {
      type: LOGOUT_REQUEST,
    })).toEqual({
      logoutRequest: true,
      logoutFailed: false,
    })
  })

  it('should handle LOGOUT_SUCCESS', () => {
    expect(logoutReducer({
      logoutRequest: true,
      logoutFailed: true,
    }, {
      type: LOGOUT_SUCCESS,
    })).toEqual({
      logoutRequest: false,
      logoutFailed: false,
    })
  })

  it('should handle LOGOUT_FAILED', () => {
    expect(logoutReducer({
      logoutRequest: true,
      logoutFailed: false,
    }, {
      type: LOGOUT_FAILED,
    })).toEqual({
      logoutRequest: false,
      logoutFailed: true,
    })
  })
})