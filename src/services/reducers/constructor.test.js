import {constructorReducer} from './constructor.ts'
import { ADD_INGREDIENT_TO_CURRENTS, ADD_BUN, SORT_CURRENT_INGREDIENT, SET_INGREDIENTS, REMOVE_INGREDIENT_FROM_CURRENTS } from '../constants/constructor'

describe('constructor reducer', () => {
  it('should return initial state', () => {
    expect(constructorReducer(undefined, {})).toEqual(
      {
        bunIngredient: {
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
        currentIngredientsList: [],
      }
    )
  })


  it('should handle ADD_INGREDIENT_TO_CURRENTS', () => {
    expect(constructorReducer(
      
        {
          bunIngredient: {},
          currentIngredientsList: [
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
        },
      
      {
        type: ADD_INGREDIENT_TO_CURRENTS,
        item: [{
          "_id":"60666c42cc7b410027a1a9b6",
          "name":"Биокотлета из марсианской Магнолии",
          "type":"main",
          "proteins":420,
          "fat":142,
          "carbohydrates":242,
          "calories":4242,
          "price":424,
          "image":"https://code.s3.yandex.net/react/code/meat-01.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
          "__v":0
        }]
      }
    )).toEqual(
      {
        bunIngredient: {},
        currentIngredientsList: [
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
         {
          "_id":"60666c42cc7b410027a1a9b6",
          "name":"Биокотлета из марсианской Магнолии",
          "type":"main",
          "proteins":420,
          "fat":142,
          "carbohydrates":242,
          "calories":4242,
          "price":424,
          "image":"https://code.s3.yandex.net/react/code/meat-01.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
          "__v":0
        },
        ]
      }
    )
  })

  it('should handle ADD_BUN', () => {
    expect(constructorReducer(  
        {
          currentIngredientsList: [],
          bunIngredient: {
            "_id":"60666c42cc7b410027a1a9b6",
            "name":"Биокотлета из марсианской Магнолии",
            "type":"main",
            "proteins":420,
            "fat":142,
            "carbohydrates":242,
            "calories":4242,
            "price":424,
            "image":"https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
            "__v":0
          },
        },
      
      {
        type: ADD_BUN,
        item: [
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
         {
            "_id":"60666c42cc7b410027a1a9b6",
            "name":"Биокотлета из марсианской Магнолии",
            "type":"main",
            "proteins":420,
            "fat":142,
            "carbohydrates":242,
            "calories":4242,
            "price":424,
            "image":"https://code.s3.yandex.net/react/code/meat-01.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
            "__v":0
         },     
        ]

      }
    )).toEqual(
      {
        currentIngredientsList: [],
        bunIngredient: {
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
      }
    )
  })

  it('should handle REMOVE_INGREDIENT_FROM_CURRENTS', () => {
    expect(constructorReducer({
      bunIngredient: {
      },
      currentIngredientsList: [
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
    }, {
      type: REMOVE_INGREDIENT_FROM_CURRENTS,
      item:        [{
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
     }],
    })).toEqual({
      bunIngredient: {},
      currentIngredientsList: [
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
    })
  })

  it('should handle SORT_CURRENT_INGREDIENT', () => {
    expect(constructorReducer({
      bunIngredient: {
      },
      currentIngredientsList: [
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
    }, {
      type: SORT_CURRENT_INGREDIENT,
      list: [
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
        },        {
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
      bunIngredient: {
      },
      currentIngredientsList: [
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
        },        {
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
    })
  })

  it('should handle SET_INGREDIENTS', () => {
    expect(constructorReducer({
      bunIngredient: {
      },
      currentIngredientsList: [
        {
          "_id":"60666c42cc7b410027a1a9b6",
          "name":"Биокотлета из марсианской Магнолии",
          "type":"main",
          "proteins":420,
          "fat":142,
          "carbohydrates":242,
          "calories":4242,
          "price":424,
          "image":"https://code.s3.yandex.net/react/code/meat-01.png",
          "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
          "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
          "__v":0
       }, 
      ],
    }, {
      type: SET_INGREDIENTS,
      list: [
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
        },        {
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
      bunIngredient: {
      },
      currentIngredientsList: [
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
        },        {
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
    })
  })

})