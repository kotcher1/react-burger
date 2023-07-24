import { ADD_CURRENT_INGREDIENT, GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from '../constants/products'
import { ingredientsReducer } from './products.ts'

describe('ingredients reducer', () => {
  it('should return initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(
      {
        ingredientsList: [],
        currentIngredient: {
          _id: '',
          name: '',
          type: '',
          proteins: 0,
          fat: 0,
          __v: 0,
          calories: 0,
          carbohydrates: 0,
          image_large: '',
          image_mobile: '',
          price: 0,
          image: '',
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
      }
    )
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
      expect(ingredientsReducer({
        ingredientsList: [],
        currentIngredient: {},
        ingredientsRequest: false,
        ingredientsFailed: false,
      }, {
        type: GET_INGREDIENTS_REQUEST,
      })).toEqual({
        ingredientsList: [],
        currentIngredient: {},
        ingredientsRequest: true,
        ingredientsFailed: false,
      })
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
      expect(ingredientsReducer({
        ingredientsList: [],
        currentIngredient: {},
        ingredientsRequest: true,
        ingredientsFailed: true,
      }, {
        type: GET_INGREDIENTS_SUCCESS,
        ingredientsList: [
          {
            "_id":"60666c42cc7b410027a1a9b1",
            "name":"Краторная булка N-200i",
            "type":"bun",
            "proteins":80,
            "fat":24,
            "carbohydrates":53,
            "calories":420,
            "price":1255,
            "image":"https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v":0
         },
         {
            "_id":"60666c42cc7b410027a1a9b5",
            "name":"Говяжий метеорит (отбивная)",
            "type":"main",
            "proteins":800,
            "fat":800,
            "carbohydrates":300,
            "calories":2674,
            "price":3000,
            "image":"https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
            "__v":0
         },
        ]
      })).toEqual({
        ingredientsList: [
          {
            "_id":"60666c42cc7b410027a1a9b1",
            "name":"Краторная булка N-200i",
            "type":"bun",
            "proteins":80,
            "fat":24,
            "carbohydrates":53,
            "calories":420,
            "price":1255,
            "image":"https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v":0
         },
         {
            "_id":"60666c42cc7b410027a1a9b5",
            "name":"Говяжий метеорит (отбивная)",
            "type":"main",
            "proteins":800,
            "fat":800,
            "carbohydrates":300,
            "calories":2674,
            "price":3000,
            "image":"https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
            "__v":0
         },
        ],
        currentIngredient: {},
        ingredientsRequest: false,
        ingredientsFailed: false,
      })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
      expect(ingredientsReducer({
        ingredientsList: [],
        currentIngredient: {},
        ingredientsRequest: true,
        ingredientsFailed: true,
      }, {
        type: GET_INGREDIENTS_FAILED,
      })).toEqual({
        ingredientsList: [],
        currentIngredient: {},
        ingredientsRequest: false,
        ingredientsFailed: true,
      })
    })

    it('should handle ADD_CURRENT_INGREDIENT', () => {
      expect(ingredientsReducer({
        ingredientsList: [],
        currentIngredient: {
          "_id":"60666c42cc7b410027a1a9b5",
            "name":"Говяжий метеорит (отбивная)",
            "type":"main",
            "proteins":800,
            "fat":800,
            "carbohydrates":300,
            "calories":2674,
            "price":3000,
            "image":"https://code.s3.yandex.net/react/code/meat-04.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
            "__v":0
        },
        ingredientsRequest: false,
        ingredientsFailed: false,
      }, {
        type: ADD_CURRENT_INGREDIENT,
        item: {
            "_id":"60666c42cc7b410027a1a9b1",
            "name":"Краторная булка N-200i",
            "type":"bun",
            "proteins":80,
            "fat":24,
            "carbohydrates":53,
            "calories":420,
            "price":1255,
            "image":"https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v":0
        }
      })).toEqual({
        ingredientsList: [],
        currentIngredient:           {
          "_id":"60666c42cc7b410027a1a9b1",
          "name":"Краторная булка N-200i",
          "type":"bun",
          "proteins":80,
          "fat":24,
          "carbohydrates":53,
          "calories":420,
          "price":1255,
          "image":"https://code.s3.yandex.net/react/code/bun-02.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
          "__v":0
       },
        ingredientsRequest: false,
        ingredientsFailed: false,
      })
    })

})