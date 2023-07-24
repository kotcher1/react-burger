import { REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from '../constants/register'
import { registerReducer } from './register.ts'

describe('logout reducer', () => {
  it('should return initial state', () => {
    expect(registerReducer(undefined, {})).toEqual(
      {
        registerRequest: false,
        registerFailed: false,
      }
    )
  })

  it('should handle REGISTER_REQUEST', () => {
    expect(registerReducer({
      registerRequest: false,
      registerFailed: false,
    }, {
      type: REGISTER_REQUEST,
    })).toEqual({
      registerRequest: true,
      registerFailed: false,
    })
  })

  it('should handle REGISTER_SUCCESS', () => {
    expect(registerReducer({
      registerRequest: true,
      registerFailed: false,
    }, {
      type: REGISTER_SUCCESS,
    })).toEqual({
      registerRequest: false,
      registerFailed: false,
    })
  })

  it('should handle REGISTER_FAILED', () => {
    expect(registerReducer({
      registerRequest: false,
      registerFailed: false,
    }, {
      type: REGISTER_FAILED,
    })).toEqual({
      registerRequest: false,
      registerFailed: true,
    })
  })
})