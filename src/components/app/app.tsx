import React, {useEffect, useState} from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';

import style from './app.module.css';
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import Login from '../login/login'
import Registration from '../registration/registration';
import ForgotPassword from '../forgot-password/forgot-password';
import Password from '../password/password';
import ModalOverlay from '../modal-overlay/modal-overlay';
import Feed from '../feed/feed';
import FeedItem from '../feed-item/feed-item';

import Profile from '../profile/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '../../services/hooks'
import { getUser } from '../../services/actions/user'
import { getCookie } from '../../services/utils'
import IngredientDetails from '../ingredient-details/ingredient-details';

import { addIngredients } from '../../services/actions/products';

import {
  WS_USER_CONNECTION_START
} from '../../services/constants/wsUserFeed';

import {
  WS_CONNECTION_START
} from '../../services/constants/wsFeed';

import {
  setSignin
} from '../../services/actions/user'

function App() {

  const location = useLocation();

  const [activeNavLink, setActiveNavLink] = useState<string>('')

  const dispatch = useDispatch();

  function changeNavLink(val: string): void {
    setActiveNavLink(val)
  }

  const state = location.state;

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    dispatch({ type: WS_CONNECTION_START });
    if(accessToken && typeof accessToken === 'string') {
      dispatch({ type: WS_USER_CONNECTION_START, accessToken});
    } else {
      dispatch({ type: WS_USER_CONNECTION_START, accessToken: ''});
    }
    if(accessToken && typeof accessToken === 'string') {
      dispatch(getUser(accessToken))
      dispatch(setSignin())
    }
    dispatch(addIngredients())
  }, [])


  return (
    <div className={style.app}>
      <AppHeader active={activeNavLink}/>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Outlet/>}>
          <Route index element={<Main changeNav={changeNavLink}/>}/>
          <Route path="/ingredients/:id" element={<IngredientDetails changeNav={changeNavLink}/>}/>
        </Route>
        <Route path="/login" element={<ProtectedRoute type="no-login" element={<Login changeNav={changeNavLink}/>}/>}/>
        <Route path="/register" element={<ProtectedRoute type="no-login" element={<Registration changeNav={changeNavLink}/>}/>}/>
        <Route path="/forgot-password" element={<ProtectedRoute type="no-login" element={<ForgotPassword changeNav={changeNavLink}/>}/>}/>
        <Route path="/reset-password" element={<ProtectedRoute type="no-login" element={<Password changeNav={changeNavLink}/>}/>}/>
        <Route path="/profile" element={<ProtectedRoute element={<Profile changeNav={changeNavLink}/>}/>}>
          <Route index element={<ProtectedRoute element={<Profile changeNav={changeNavLink}/>}/>}/>
          <Route path="/profile/:section" element={null} />
          <Route path="/profile/orders/:id" element={<FeedItem/>}/>
        </Route>
        <Route path="/feed" element={<Outlet/>}>
          <Route index element={<Feed changeNav={changeNavLink}/>}/>
          <Route path="/feed/:id" element={<FeedItem changeNav={changeNavLink}/>}/>
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<ModalOverlay type="product" />} />
          <Route path="/profile/orders/:id" element={<ModalOverlay type="orderInfo" />}/>
          <Route path="/feed/:id" element={<ModalOverlay page="feed" type="orderInfo" />}/>
        </Routes>
      )}
    </div>
  );
}

export default App;
