import React, {useEffect} from 'react';

import style from './ingredient-details.module.css'

import {useSelector, useDispatch} from 'react-redux'

import { useParams } from 'react-router-dom';
import { addIngredients } from '../../services/actions/products'

import { TItem } from '../../utils/types'

export default function IngredientDetails({changeNav}: {changeNav?: (val: string) => void}) {

  const dispatch = useDispatch()
  // @ts-ignore
  const ingredients = useSelector(store => store.ingredients.ingredientsList)

  useEffect(() => {
    if(ingredients.length === 0) {
      // @ts-ignore
      dispatch(addIngredients())
    }
    if(changeNav) {
      changeNav('constructor')
    }
  }, [])

  useEffect(() => {
    if(ingredients.length === 0) {
      // @ts-ignore
      dispatch(addIngredients())
    }
  }, [ingredients])

  const {id} = useParams()
  // @ts-ignore
  const currentIngredient = useSelector(store => store.ingredients.currentIngredient)
  const idIngredient = ingredients.find((element: TItem) => element._id === id)

 

  const info = currentIngredient._id ? currentIngredient : idIngredient

  return info && (
    <div className={style.details}>
      <p className={`${style.title} text_type_main-large`}>
        Детали ингредиента
      </p>
      <div className={style.info}>
        <img src={info.image_large} alt="Ingredient"/>
        <p className={`${style.name} text_type_main-medium mt-4`}>
          {info.name}
        </p>
        <div className={`${style.properties} mt-8`}>
          <div className={style.property}>
            <p className={`${style.propetyName} text_type_main-default mt-2`}>
              Калории,ккал
            </p>
            <p className={`${style.propertyValue} text_type_digits-default`}>
              {info.calories}
            </p>
          </div>
          <div className={`${style.property} ml-5`}>
            <p className={`${style.propetyName} text_type_main-default mt-2`}>
              Белки, г
            </p>
            <p className={`${style.propertyValue} text_type_digits-default`}>
              {info.carbohydrates}
            </p>
          </div>
          <div className={`${style.property} ml-5`}>
            <p className={`${style.propetyName} text_type_main-default mt-2`}>
              Жиры, г
            </p>
            <p className={`${style.propertyValue} text_type_digits-default`}>
              {info.fat}
            </p>
          </div>
          <div className={`${style.property} ml-5`}>
            <p className={`${style.propetyName} text_type_main-default mt-2`}>
              Углеводы, г
            </p>
            <p className={`${style.propertyValue} text_type_digits-default`}>
              {info.proteins}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}