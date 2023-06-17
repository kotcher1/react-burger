import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import style from './app.module.css';
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import Login from '../login/login'
import Registration from '../registration/registration';
import ForgotPassword from '../forgot-password/forgot-password';
import Password from '../password/password';

import Profile from '../profile/profile';
import { ProtectedRoute } from '../protected-route/protected-route';
import { ProvideAuth } from "../../services/auth";
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../services/actions/user'
import { getCookie } from '../../services/utils'
import IngredientDetails from '../ingredient-details/ingredient-details';


function App() {

  const [activeNavLink, setActiveNavLink] = useState('')

  const dispatch = useDispatch();

  function changeNavLink(string) {
    setActiveNavLink(string)
  }

  useEffect(() => {
    if(getCookie('token') && getCookie('token').length > 0) {
      dispatch({type: 'SET_SIGNIN'})
      dispatch(getUser())
    }
  }, [])

  const currentIngredient = useSelector(store => store.ingredients.currentIngredient);

  return (
    <div className={style.app}>
      <ProvideAuth>
        <BrowserRouter>
          <AppHeader active={activeNavLink}/>
          <Routes>
            <Route path="/" element={null}>
              <Route index element={<Main changeNav={changeNavLink}/>}/>
              <Route path="/ingredients/:id" element={currentIngredient._id ? <Main changeNav={changeNavLink}/> : <IngredientDetails changeNav={changeNavLink}/>}/>
            </Route>
            <Route path="/login" element={<Login changeNav={changeNavLink}/>}/>
            <Route path="/register" element={<Registration changeNav={changeNavLink}/>}/>
            <Route path="/forgot-password" element={<ProtectedRoute type="no-login" element={<ForgotPassword changeNav={changeNavLink}/>}/>}/>
            <Route path="/reset-password" element={<ProtectedRoute type="no-login" element={<Password changeNav={changeNavLink}/>}/>}/>
            <Route path="/profile" element={<ProtectedRoute element={<Profile changeNav={changeNavLink}/>}/>}>
              <Route path="/profile/:section" element={null}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProvideAuth>
    </div>
  );
}

export default App;
