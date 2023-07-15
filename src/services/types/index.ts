import { store } from '../store';

import type { ThunkAction, ThunkDispatch } from 'redux-thunk';


import { TConstructorActions } from '../actions/constructor'
import { TProductsActions } from '../actions/products'
import { TModalActions } from '../actions/modal'
import { TOrderActions } from '../actions/order'
import { TRegisterActions } from '../actions/register'
import { TLoginActions } from '../actions/login'
import { TUserActions } from '../actions/user'
import { TLogoutActions } from '../actions/logout'
import { TWSActions } from '../actions/wsFeed'

export type RootState = ReturnType<typeof store.getState>; 

export type TApplicationActions = TWSActions 
| TProductsActions 
| TModalActions 
| TConstructorActions 
| TOrderActions 
| TRegisterActions 
| TLoginActions 
| TUserActions 
| TLogoutActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>; 

export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;