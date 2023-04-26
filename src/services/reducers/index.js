import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { ingredientsReducer } from './products';
import { registerReducer } from './register';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  constructors: constructorReducer,
  order: orderReducer,
  register: registerReducer,
});