import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modal'
import { modalReducer } from './modal.ts'

describe('mdal reducer', () => {
  it('should return initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(
      {
        productModalOpened: false,
        orderModalOpened: false,
        currentModalOpened: false,
      }
    )
  })

  it('should handle OPEN_MODAL', () => {
    expect(modalReducer({
      productModalOpened: false,
      orderModalOpened: false,
      currentModalOpened: false,
    }, {
      type: OPEN_MODAL,
      product: false,
      order: false,
      currentOrder: true,
    })).toEqual({
      productModalOpened: false,
      orderModalOpened: false,
      currentModalOpened: true,
    })

    expect(modalReducer({
      productModalOpened: false,
      orderModalOpened: false,
      currentModalOpened: true,
    }, {
      type: OPEN_MODAL,
      product: true,
      order: false,
      currentOrder: false,
    })).toEqual({
      productModalOpened: true,
      orderModalOpened: false,
      currentModalOpened: false,
    })
  })

  it('should handle CLOSE_MODAL', () => {
    expect(modalReducer({
      productModalOpened: true,
      orderModalOpened: false,
      currentModalOpened: false,
    }, {
      type: CLOSE_MODAL,
    })).toEqual({
      productModalOpened: false,
      orderModalOpened: false,
      currentModalOpened: false,
    })

    expect(modalReducer({
      productModalOpened: false,
      orderModalOpened: true,
      currentModalOpened: false,
    }, {
      type: CLOSE_MODAL,
    })).toEqual({
      productModalOpened: false,
      orderModalOpened: false,
      currentModalOpened: false,
    })
  })
})