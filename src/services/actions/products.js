import { getIngredients } from '../api.js'
export const RESET_ORDER = 'RESET_ORDER'

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_ITEMS_FAILED';
export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT'
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT'
export const GET_ORDER_ID_REQUEST = 'GET_ORDER_ID_REQUEST';
export const GET_ORDER_ID_SUCCESS = 'GET_ORDER_ID_SUCCESS';
export const GET_ORDER_ID_FAILED = 'GET_ORDER_ID_FAILED';


export function addIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredients
    .catch(err => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
    })
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredientsList: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  }
};
