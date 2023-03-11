import React from 'react';
import BurgerIngredients from '../burger-Ingredients/burger-Ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import PropTypes from 'prop-types';

import style from './main.module.css'

export default function Main({ingredients}) {
  return (
    <main className={`${style.main} pb-10`}>
      <BurgerIngredients ingredients={ingredients}/>
      <BurgerConstructor ingredients={ingredients}/>
    </main>
  )
}

Main.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      "_id": PropTypes.string,
      "name": PropTypes.string,
      "type": PropTypes.string,
      "proteins": PropTypes.number,
      "fat": PropTypes.number,
      "carbohydrates": PropTypes.number,
      "calories": PropTypes.number,
      "price": PropTypes.number,
      "image": PropTypes.string,
      "image_mobile": PropTypes.string,
      "image_large": PropTypes.string,
      "__v": PropTypes.number
    }),
  ),
}; 