import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
} from '../constants/products'

import {
  TProductsActions
} from '../actions/products'
import { TItem } from '../types/types'

type TProductsStore = {
  ingredientsList: TItem[],
  currentIngredient: TItem,
  ingredientsRequest: boolean,
  ingredientsFailed: boolean,
}

const initialState: TProductsStore = {
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

export const ingredientsReducer = (state = initialState, action: TProductsActions): TProductsStore => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredientsList: action.ingredientsList,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: true,
      };
    }
    case ADD_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.item
      }
    }
    default: {
      return state;
    }
  }
}