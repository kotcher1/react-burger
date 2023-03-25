import { 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
} from '../actions/products'

const initialState = {
  ingredientsList: [],
  currentIngredient: {},
  ingredientsRequest: false,
  ingredientsFailed: false,
}

export const ingredientsReducer = (state = initialState, action) => {
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
    case REMOVE_CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: {}
      }
    }
    default: {
      return state;
    }
  }
}