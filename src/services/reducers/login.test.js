import {loginReducer} from './login.ts'
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from '../constants/login'

describe('logon reducer', () => {
  it('should return initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(
      {
        loginRequest: false,
        loginFailed: false,
      }
    )
  })

  it('should handle LOGIN_REQUEST', () => {
    expect(loginReducer({
      loginRequest: false,
      loginFailed: false,
    },
    {
      type: LOGIN_REQUEST,
    })).toEqual({
      loginRequest: true,
      loginFailed: false,
    })
  })

  it('should handle LOGIN_SUCCESS', () => {
    expect(loginReducer({
      loginRequest: true,
      loginFailed: true,
    },
    {
      type: LOGIN_SUCCESS,
    })).toEqual({
      loginRequest: false,
      loginFailed: false,
    })
  })

  it('should handle LOGIN_FAILED', () => {
    expect(loginReducer({
      loginRequest: true,
      loginFailed: false,
    },
    {
      type: LOGIN_FAILED,
    })).toEqual({
      loginRequest: false,
      loginFailed: true,
    })
  })

})