import {  
  ADD_INGREDIENT_TO_CURRENTS,
  REMOVE_INGREDIENT_FROM_CURRENTS,
  ADD_BUN,
  SORT_CURRENT_INGREDIENT,
  SET_INGREDIENTS,
} from '../constants/constructor'

import {
  TConstructorActions
} from '../actions/constructor'

import {
  TItem
} from '../types/types'

type TConstructorState = {
  bunIngredient: TItem,
  currentIngredientsList: TItem[]
}

const initialState: TConstructorState = {
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

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {
   switch (action.type) {
    case ADD_INGREDIENT_TO_CURRENTS: {
      return {
        ...state,
        currentIngredientsList: [...state.currentIngredientsList, ...action.item]
      }
    }
    case REMOVE_INGREDIENT_FROM_CURRENTS: {
      return {
        ...state,
        currentIngredientsList: action.item
      }
    }
    case ADD_BUN: {
      return {
        ...state,
        bunIngredient: action.item[0]
      }
    }
    case SORT_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredientsList: action.list
      }
    }
    case SET_INGREDIENTS: {
      return {
        ...state,
        currentIngredientsList: action.list,
      }
    }
    default: {
      return state;
    }
  }
}