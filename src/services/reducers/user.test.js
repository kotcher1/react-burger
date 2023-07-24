import { PASSWORD_REQUEST, PASSWORD_RESET, SET_PASSWORD, SET_USER_INFORMATION, USER_LOGOUT } from '../constants/user'
import { userReducer } from './user.ts'

describe('user reducer', () => {
  it('should return initial state', () => {
    expect(userReducer(undefined, {})).toEqual(
      {
        email: '',
        name: '',
        accessToken: '',
        signIn: false,
        passwordRequest: false,
        passwordReset: false,
        password: '',
      }
    )
  })

  it('should handle SET_USER_INFORMATION', () => {
    expect(userReducer({
      email: '',
      name: '',
      accessToken: '',
      signIn: false,
      passwordRequest: false,
      passwordReset: false,
      password: '',
    }, {
      type: SET_USER_INFORMATION,
      email: 'ttt@gmail.com',
      name: 'TMan',
      accessToken: 'Bearer flfRLFPDLSfldls',
    })).toEqual({
      email: 'ttt@gmail.com',
      name: 'TMan',
      accessToken: 'Bearer flfRLFPDLSfldls',
      signIn: true,
      passwordRequest: false,
      passwordReset: false,
      password: '',
    })
  })

  it('should handle SET_PASSWORD', () => {
    expect(userReducer({
      email: '',
      name: '',
      accessToken: '',
      signIn: false,
      passwordRequest: false,
      passwordReset: false,
      password: '',
    }, {
      type: SET_PASSWORD,
      password: '45356'
    })).toEqual({
      email: '',
      name: '',
      accessToken: '',
      signIn: false,
      passwordRequest: false,
      passwordReset: false,
      password: '45356',
    })
  })

  it('should handle PASSWORD_REQUEST', () => {
    expect(userReducer({
      email: '',
      name: '',
      accessToken: '',
      signIn: false,
      passwordRequest: false,
      passwordReset: false,
      password: '',
    }, {
      type: PASSWORD_REQUEST,
    })).toEqual({
      email: '',
      name: '',
      accessToken: '',
      signIn: false,
      passwordRequest: true,
      passwordReset: false,
      password: '',
    })
  })

  it('should handle PASSWORD_RESET', () => {
    expect(userReducer({
      email: '',
      name: '',
      accessToken: '',
      signIn: false,
      passwordRequest: true,
      passwordReset: false,
      password: '',
    }, {
      type: PASSWORD_RESET,
    })).toEqual({
      email: '',
      name: '',
      accessToken: '',
      signIn: false,
      passwordRequest: false,
      passwordReset: true,
      password: '',
    })
  })

  it('should handle USER_LOGOUT', () => {
    expect(userReducer({
      email: 'd@mail.ru',
      name: 'DMan',
      accessToken: 'sdfSFSFSFSFSasadhllv',
      signIn: true,
      passwordRequest: false,
      passwordReset: false,
      password: '3423222',
    }, {
      type: USER_LOGOUT,
    })).toEqual({
      email: 'd@mail.ru',
      name: 'DMan',
      accessToken: 'sdfSFSFSFSFSasadhllv',
      signIn: false,
      passwordRequest: false,
      passwordReset: false,
      password: '3423222',
    })
  })

  it('should handle USER_LOGOUT', () => {
    expect(userReducer({
      email: 'd@mail.ru',
      name: 'DMan',
      accessToken: 'sdfSFSFSFSFSasadhllv',
      signIn: true,
      passwordRequest: false,
      passwordReset: false,
      password: '3423222',
    }, {
      type: USER_LOGOUT,
    })).toEqual({
      email: 'd@mail.ru',
      name: 'DMan',
      accessToken: 'sdfSFSFSFSFSasadhllv',
      signIn: false,
      passwordRequest: false,
      passwordReset: false,
      password: '3423222',
    })
  })

})