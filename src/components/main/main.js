import React from 'react';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import PropTypes from 'prop-types';
import { ingredientRules } from '../../utils/prop-types';

import style from './main.module.css'

export default function Main({ingredients}) {
  return (
    <main className={`${style.main} pb-10`}>
      <BurgerIngredients ingredients={ingredients}/>
      <BurgerConstructor ingredients={ingredients}/>
    </main>
  )
}

Main.propTypes = ingredientRules