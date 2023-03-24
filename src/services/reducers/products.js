import { 
  OPEN_MODAL, 
  CLOSE_MODAL, 
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT_TO_CURRENTS,
  REMOVE_INGREDIENT_FROM_CURRENTS,
  ADD_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
  ADD_BUN,
  SORT_CURRENT_INGREDIENT,
  GET_ORDER_ID_REQUEST,
  GET_ORDER_ID_SUCCESS,
  GET_ORDER_ID_FAILED,
} from '../actions/products'

const initialState = {
  ingredientsList: [],
  currentIngredientsList: [],
  currentIngredient: {},
  order: {
    
  },
  bunIngredient: '',
  ingredientsRequest: false,
  ingredientsFailed: false,
  productModalOpened: false,
  orderModalOpened: false,
  orderRequest: false,
  orderFailed: false,
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
    case OPEN_MODAL: {
      return {
        ...state,
        productModalOpened: action.product,
        orderModalOpened: action.order,
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        productModalOpened: false,
        orderModalOpened: false,
        currentIngredient: {},
        order: {},
      }
    }
    case GET_ORDER_ID_REQUEST: {
      return {
        ...state,
        orderModalOpened: true,
        orderRequest: true,
      }
    }
    case GET_ORDER_ID_SUCCESS: {
      return {
        ...state,
        order: action.order,
        orderRequest: false,
        orderFailed: false,
      }
    }
    case GET_ORDER_ID_FAILED: {
      return {
        ...state,
        order: {},
        orderRequest: false,
        orderFailed: true,
      }
    }
    default: {
      return state;
    }
  }
}