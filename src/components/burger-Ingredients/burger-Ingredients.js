import React from 'react';
import Product from '../product/product';
import PropTypes from 'prop-types';
import { ingredientRules } from '../../utils/prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './burger-ingredients.module.css'


export default function BurgerIngredients({ingredients}) {

  const [current, setCurrent] = React.useState('one')

  return (
    <section className={`${style.burgerIngredients} mt-10`}>
      <p className={`${style.title} text_type_main-large`}>
        Соберите бургер
      </p>
      <div style={{ display: 'flex' }} className="mt-5">
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${style.container}`}>
        <div className={`${style.productSection}  mt-10`}>
          <p className={`${style.containerTitle} m-0 text_type_main-medium`}>
            Булки
          </p>
          <div className={`${style.block} pl-4 pr-4`}>
            {ingredients.map((item, index) => {
              if(item.type === 'bun') {
                return <Product info={item} index={index} key={item._id} />
              }
            })}
          </div>
        </div>
        <div className={`${style.productSection}  mt-10`}>
          <p className={`${style.containerTitle} m-0 text_type_main-medium`}>
            Соусы
          </p>
          <div className={`${style.block} pl-4 pr-4`}>
            {ingredients.map((item, index) => {
              if(item.type === 'sauce') {
                return <Product info={item} key={item._id} />
              }
            })}
          </div>
        </div>
        <div className={`${style.productSection}  mt-10`}>
          <p className={`${style.containerTitle} m-0 text_type_main-medium`}>
            Начинки
          </p>
          <div className={`${style.block} pl-4 pr-4`}>
            {ingredients.map((item) => {
              if(item.type === 'main') {
                return <Product info={item} key={item._id} />
              }
            })}
          </div>
        </div>
      </div>    

    </section>
  )
}

BurgerIngredients.propTypes = ingredientRules;