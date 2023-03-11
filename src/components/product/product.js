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
        <ModalOverlay info={info} close={closeModal} type="product" />
      )}
    </>
  )
}

Product.propTypes = {
  info: PropTypes.shape({
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
  index: PropTypes.number,
}; 

