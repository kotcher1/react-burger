import React from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header'
import Main from '../main/main'


function App() {

  return (
    <div className={style.app}>
      <AppHeader />
      <Main/>
    </div>
  );
}

export default App;
