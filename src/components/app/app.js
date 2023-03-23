import React from 'react';
import style from './app.module.css';
import AppHeader from '../app-header/app-header'
import Main from '../main/main'


function App() {

  const [ingredients, setIngrediens] = React.useState([])

  const url = 'https://norma.nomoreparties.space/api/ingredients'

  const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  React.useEffect(() => {
    fetch(url)
    .then(checkReponse)
    .then(res => {
      setIngrediens(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <div className={style.app}>
      <AppHeader />
      <Main ingredients={ingredients}/>
    </div>
  );
}

export default App;