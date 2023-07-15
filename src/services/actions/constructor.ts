import {
  ADD_INGREDIENT_TO_CURRENTS,
  REMOVE_INGREDIENT_FROM_CURRENTS,
  ADD_BUN,
  SORT_CURRENT_INGREDIENT,
  SET_INGREDIENTS
} from '../constants/constructor'

import {
  TItem
} from '../types/types'

export interface IAddIngredientToCurrents {
  readonly type: typeof ADD_INGREDIENT_TO_CURRENTS;
  readonly item: TItem[];
}

export interface IRemoveIngredientFromCurrents {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CURRENTS;
  readonly item: TItem[];
}

export interface IAddBun {
  readonly type: typeof ADD_BUN;
  readonly item: TItem[];
}

export interface ISortCurrentIngredient {
  readonly type: typeof SORT_CURRENT_INGREDIENT;
  readonly list: TItem[];
}

export interface ISetIngredients {
  readonly type: typeof SET_INGREDIENTS;
  readonly list: TItem[];
}

export type TConstructorActions = IAddIngredientToCurrents
  | IRemoveIngredientFromCurrents
  | IAddBun
  | ISortCurrentIngredient
  | ISetIngredients

export const addIngredientToCurrents = (item: TItem[]): IAddIngredientToCurrents => ({
  type: ADD_INGREDIENT_TO_CURRENTS,
  item,
});

export const removeIngredientFromCurrents = (item: TItem[]): IRemoveIngredientFromCurrents => ({
  type: REMOVE_INGREDIENT_FROM_CURRENTS,
  item,
});

export const addBun = (item: TItem[]): IAddBun => ({
  type: ADD_BUN,
  item,
});

export const sortCurrentIngredients = (list: TItem[]): ISortCurrentIngredient => ({
  type: SORT_CURRENT_INGREDIENT,
  list,
});

export const setIngredients = (list: TItem[]): ISetIngredients => ({
  type: SET_INGREDIENTS,
  list,
});