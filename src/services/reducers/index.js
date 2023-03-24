import { combineReducers } from 'redux';
import { ingredientsReducer } from './products';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});