import React from 'react';
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


function App() {

  return (
    <div className={style.app}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Main />}/>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Registration />}/>
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path="/reset-password" element={<Password />}/>
          <Route path="/profile" element={<ProtectedRoute element={<Profile />}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
