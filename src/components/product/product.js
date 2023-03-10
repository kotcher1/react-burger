import React from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import PropTypes from 'prop-types';

import style from './product.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay';
import IngredientDetails from '../ingredient-details/ingredient-details';

export default function Product({info, index}) {

  const [isModalOpened, setIsModalOpened] = React.useState(false)

  const openModal = (e) => {
    setIsModalOpened(true)
  }

  const closeModal = (e) => {
    setIsModalOpened(false)
  }


  return (
    <>
    <div className={`${style.card} mt-6`} onClick={openModal}>
      <img src={info.image} alt="Product">
      </img>
      <div className={style.priceBlock}>
        <p className={`${style.price} mr-2 text_type_digits-default`}>
          {info.price}
        </p>
        <CurrencyIcon />
      </div>
      <p className={`${style.productName} mt-1 text_type_main-default`}>
        {info.name}
      </p>
      {index === 0 && <Counter count={1}/>}
    </div>
    {isModalOpened && (
        <ModalOverlay close={closeModal}>
          <IngredientDetails info={info}/>
        </ModalOverlay>
      )}
    </>
  )
}

Product.propTypes = {
  info: PropTypes.object,
  index: PropTypes.number,
}; 

