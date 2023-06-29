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

import Profile from '../profile/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../services/actions/user'
import { getCookie } from '../../services/utils'
import IngredientDetails from '../ingredient-details/ingredient-details';


function App() {

  const location = useLocation();

  const [activeNavLink, setActiveNavLink] = useState('')

  const dispatch = useDispatch();

  function changeNavLink(string) {
    setActiveNavLink(string)
  }

  const state = location.state;

  const currentIngredient = useSelector(store => store.ingredients.currentIngredient);

  useEffect(() => {
    if(getCookie('accessToken') && getCookie('accessToken').length > 0) {
      dispatch(getUser(getCookie('accessToken')))
      dispatch({type: 'SET_SIGNIN'})
    }
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
          <Route path="/profile/:section" element={null}/>
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/ingredients/:id" element={<ModalOverlay info={currentIngredient} type="product" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
