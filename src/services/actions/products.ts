import { getIngredients } from '../api'

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_CURRENT_INGREDIENT,
} from '../constants/products'
import { AppDispatch } from '../types';

import {
  TItem,
} from '../types/types'

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredientsList: TItem[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IAddCurrentIngredient {
  readonly type: typeof ADD_CURRENT_INGREDIENT;
  readonly item: TItem;
}

export type TProductsActions = IGetIngredientsRequest
  | IGetIngredientsSuccess
  | IGetIngredientsFailed
  | IAddCurrentIngredient

export const getIngredientsRequest = (): IGetIngredientsRequest => ({
  type: GET_INGREDIENTS_REQUEST,
});

export const getIngredientsSuccess = (ingredientsList: TItem[]): IGetIngredientsSuccess => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredientsList,
});

export const getIngredientsFailed = (): IGetIngredientsFailed => ({
  type: GET_INGREDIENTS_FAILED,
});

export const addCurrentIngredient = (item: TItem): IAddCurrentIngredient => ({
  type: ADD_CURRENT_INGREDIENT,
  item,
});


export const addIngredients = (): any => {
  return function(dispatch: AppDispatch) {
    dispatch(getIngredientsRequest());
    getIngredients
    .catch(err => {
      dispatch(getIngredientsFailed());
    })
    .then(res => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data));
      } else {
        dispatch(getIngredientsFailed());
      }
    });
  }
};
