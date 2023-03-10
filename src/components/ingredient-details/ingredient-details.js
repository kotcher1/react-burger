import React from 'react';
import PropTypes from 'prop-types';

import style from './ingredient-details.module.css'

export default function IngredientDetails({info}) {
  return (
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

IngredientDetails.propTypes = {
  info: PropTypes.object,
}; 