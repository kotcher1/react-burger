import {  
  ADD_INGREDIENT_TO_CURRENTS,
  REMOVE_INGREDIENT_FROM_CURRENTS,
  ADD_BUN,
  SORT_CURRENT_INGREDIENT,
  SET_INGREDIENTS,
} from '../actions/constructor'

const initialState = {
  bunIngredient: '',
  currentIngredientsList: [],
}

export const constructorReducer = (state = initialState, action) => {
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