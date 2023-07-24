import React, {useEffect} from 'react';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import style from './main.module.css'

export default function Main({changeNav}: {changeNav: (val: string) => void}) {

  useEffect(() => {
    changeNav('constructor')
  }, [])



  return (
    <main className={`${style.main} pb-10`}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients/>
        <BurgerConstructor/>
      </DndProvider>
    </main>
  )
}