import { GET_ORDER_ID_FAILED, GET_ORDER_ID_REQUEST, GET_ORDER_ID_SUCCESS, RESET_ORDER } from '../constants/order'
import { orderReducer } from './order.ts'

describe('order reducer', () => {
  it('should return initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(
      {
        orderRequest: false,
        orderFailed: false,
        order: {},
      }
    )
  })

  it('should handle GET_ORDER_ID_REQUEST', () => {
    expect(orderReducer({
      orderRequest: false,
      orderFailed: false,
      order: {},
    }, {
      type: GET_ORDER_ID_REQUEST,
    })).toEqual({
      orderRequest: true,
      orderFailed: false,
      order: {},
    })
  })

  it('should handle GET_ORDER_ID_SUCCESS', () => {
    expect(orderReducer({
      orderRequest: true,
      orderFailed: true,
      order: {},
    }, {
      type: GET_ORDER_ID_SUCCESS,
      order: {
        "success": true,
        "name": "Space метеоритный флюоресцентный бургер",
        "order": {
            "ingredients": [
                {
                    "_id": "643d69a5c3f7b9001cfa093d",
                    "name": "Флюоресцентная булка R2-D3",
                    "type": "bun",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa0940",
                    "name": "Говяжий метеорит (отбивная)",
                    "type": "main",
                    "proteins": 800,
                    "fat": 800,
                    "carbohydrates": 300,
                    "calories": 2674,
                    "price": 3000,
                    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa0943",
                    "name": "Соус фирменный Space Sauce",
                    "type": "sauce",
                    "proteins": 50,
                    "fat": 22,
                    "carbohydrates": 11,
                    "calories": 14,
                    "price": 80,
                    "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa093d",
                    "name": "Флюоресцентная булка R2-D3",
                    "type": "bun",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    "__v": 0
                }
            ],
            "_id": "64bc75e482e277001bf9f919",
            "owner": {
                "name": "Hanna",
                "email": "hanna@hanna.hanna",
                "createdAt": "2023-06-15T20:08:38.597Z",
                "updatedAt": "2023-07-12T17:32:31.568Z"
            },
            "status": "done",
            "name": "Space метеоритный флюоресцентный бургер",
            "createdAt": "2023-07-23T00:35:48.596Z",
            "updatedAt": "2023-07-23T00:35:48.924Z",
            "number": 13996,
            "price": 5056
        }
    }
    })).toEqual({
      orderRequest: false,
      orderFailed: false,
      order: {
        "success": true,
        "name": "Space метеоритный флюоресцентный бургер",
        "order": {
            "ingredients": [
                {
                    "_id": "643d69a5c3f7b9001cfa093d",
                    "name": "Флюоресцентная булка R2-D3",
                    "type": "bun",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa0940",
                    "name": "Говяжий метеорит (отбивная)",
                    "type": "main",
                    "proteins": 800,
                    "fat": 800,
                    "carbohydrates": 300,
                    "calories": 2674,
                    "price": 3000,
                    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa0943",
                    "name": "Соус фирменный Space Sauce",
                    "type": "sauce",
                    "proteins": 50,
                    "fat": 22,
                    "carbohydrates": 11,
                    "calories": 14,
                    "price": 80,
                    "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa093d",
                    "name": "Флюоресцентная булка R2-D3",
                    "type": "bun",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    "__v": 0
                }
            ],
            "_id": "64bc75e482e277001bf9f919",
            "owner": {
                "name": "Hanna",
                "email": "hanna@hanna.hanna",
                "createdAt": "2023-06-15T20:08:38.597Z",
                "updatedAt": "2023-07-12T17:32:31.568Z"
            },
            "status": "done",
            "name": "Space метеоритный флюоресцентный бургер",
            "createdAt": "2023-07-23T00:35:48.596Z",
            "updatedAt": "2023-07-23T00:35:48.924Z",
            "number": 13996,
            "price": 5056
        }
    },
    })
  })

  it('should handle GET_ORDER_ID_FAILED', () => {
    expect(orderReducer({
      orderRequest: true,
      orderFailed: false,
      order: {
        "success": true,
        "name": "Space метеоритный флюоресцентный бургер",
        "order": {
            "ingredients": [
                {
                    "_id": "643d69a5c3f7b9001cfa093d",
                    "name": "Флюоресцентная булка R2-D3",
                    "type": "bun",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa0940",
                    "name": "Говяжий метеорит (отбивная)",
                    "type": "main",
                    "proteins": 800,
                    "fat": 800,
                    "carbohydrates": 300,
                    "calories": 2674,
                    "price": 3000,
                    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa0943",
                    "name": "Соус фирменный Space Sauce",
                    "type": "sauce",
                    "proteins": 50,
                    "fat": 22,
                    "carbohydrates": 11,
                    "calories": 14,
                    "price": 80,
                    "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa093d",
                    "name": "Флюоресцентная булка R2-D3",
                    "type": "bun",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    "__v": 0
                }
            ],
            "_id": "64bc75e482e277001bf9f919",
            "owner": {
                "name": "Hanna",
                "email": "hanna@hanna.hanna",
                "createdAt": "2023-06-15T20:08:38.597Z",
                "updatedAt": "2023-07-12T17:32:31.568Z"
            },
            "status": "done",
            "name": "Space метеоритный флюоресцентный бургер",
            "createdAt": "2023-07-23T00:35:48.596Z",
            "updatedAt": "2023-07-23T00:35:48.924Z",
            "number": 13996,
            "price": 5056
        }
    },
    }, {
      type: GET_ORDER_ID_FAILED,
    })).toEqual({
      orderRequest: false,
      orderFailed: true,
      order: {},
    })
  })

  it('should handle RESET_ORDER', () => {
    expect(orderReducer({
      orderRequest: false,
      orderFailed: true,
      order: {
        "success": true,
        "name": "Space метеоритный флюоресцентный бургер",
        "order": {
            "ingredients": [
                {
                    "_id": "643d69a5c3f7b9001cfa093d",
                    "name": "Флюоресцентная булка R2-D3",
                    "type": "bun",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa0940",
                    "name": "Говяжий метеорит (отбивная)",
                    "type": "main",
                    "proteins": 800,
                    "fat": 800,
                    "carbohydrates": 300,
                    "calories": 2674,
                    "price": 3000,
                    "image": "https://code.s3.yandex.net/react/code/meat-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa0943",
                    "name": "Соус фирменный Space Sauce",
                    "type": "sauce",
                    "proteins": 50,
                    "fat": 22,
                    "carbohydrates": 11,
                    "calories": 14,
                    "price": 80,
                    "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
                    "__v": 0
                },
                {
                    "_id": "643d69a5c3f7b9001cfa093d",
                    "name": "Флюоресцентная булка R2-D3",
                    "type": "bun",
                    "proteins": 44,
                    "fat": 26,
                    "carbohydrates": 85,
                    "calories": 643,
                    "price": 988,
                    "image": "https://code.s3.yandex.net/react/code/bun-01.png",
                    "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    "__v": 0
                }
            ],
            "_id": "64bc75e482e277001bf9f919",
            "owner": {
                "name": "Hanna",
                "email": "hanna@hanna.hanna",
                "createdAt": "2023-06-15T20:08:38.597Z",
                "updatedAt": "2023-07-12T17:32:31.568Z"
            },
            "status": "done",
            "name": "Space метеоритный флюоресцентный бургер",
            "createdAt": "2023-07-23T00:35:48.596Z",
            "updatedAt": "2023-07-23T00:35:48.924Z",
            "number": 13996,
            "price": 5056
        }
    },
    }, {
      type: RESET_ORDER,
    })).toEqual({
      orderRequest: false,
      orderFailed: true,
      order: {},
    })
  })

})