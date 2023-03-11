import React from 'react';

import style from './order-details.module.css'

import done from '../../images/done.jpg'

export default function OrderDetails() {
  return (
    <div className={`${style.info} mt-20`}>
      <p className={`${style.number} text_type_digits-large`}>
        034536
      </p>
      <p className={`${style.subtitle} mt-8 text_type_main-medium`}>
        идентификатор заказа
      </p>
      <img alt="Icon" src={done} className="mt-15"/>
      <p className={`${style.info} text_type_main-small mt-15`}>
        Ваш заказ начали готовить
      </p>
      <p className='text_color_inactive text_type_main-small mt-2 mb-20'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}