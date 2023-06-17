import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { modalReducer } from './modal';
import { orderReducer } from './order';
import { ingredientsReducer } from './products';
import { registerReducer } from './register';
import { loginReducer } from './login';
import { userReducer } from './user';
import { logoutReducer } from './logout';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  constructors: constructorReducer,
  order: orderReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  logout: logoutReducer,
});