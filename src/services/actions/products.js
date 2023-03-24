import { getIngredients } from '../api.js'

export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const GET_INGREDIENTS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_ITEMS_FAILED';

export const ADD_INGREDIENT_TO_CURRENTS = 'ADD_INGREDIENT'
export const REMOVE_INGREDIENT_FROM_CURRENTS = 'REMOVE_INGREDIENT'

export const ADD_CURRENT_INGREDIENT = 'ADD_CURRENT_INGREDIENT'
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT'
export const ADD_BUN = 'ADD_BUN'

export const SORT_CURRENT_INGREDIENT = 'SORT_CURRENT_INGREDIENT'

export const GET_ORDER_ID_REQUEST = 'GET_ORDER_ID_REQUEST';
export const GET_ORDER_ID_SUCCESS = 'GET_ORDER_ID_SUCCESS';
export const GET_ORDER_ID_FAILED = 'GET_ORDER_ID_FAILED';


export function addIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredients.then(res => {
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

export function addId(ingredients) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_ID_REQUEST
    });
    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "ingredients": ingredients,
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_ID_SUCCESS,
          order: res,
        });
      } else {
        dispatch({
          type: GET_ORDER_ID_FAILED
        });
      }
    });
  }
};