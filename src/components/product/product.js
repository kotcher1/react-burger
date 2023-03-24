import React from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import PropTypes from 'prop-types';
import { infoRules } from '../../utils/prop-types';

import style from './product.module.css'
import ModalOverlay from '../modal-overlay/modal-overlay';

import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';

export default function Product({info}) {

  const {_id} = info;

  const dispatch = useDispatch()


  const [count, setCount] = React.useState(0);

  const currentIngredients = useSelector(state => state.ingredients.currentIngredientsList)
  const bunIngredient = useSelector(state => state.ingredients.bunIngredient)
  const productModalOpened = useSelector(state => state.ingredients.productModalOpened)

  const handleIngredientClick = () => {
    dispatch({type: 'ADD_CURRENT_INGREDIENT', item: info})
    dispatch({type: 'OPEN_MODAL', product: true, order: false})
  }

  const [, dragRef] = useDrag({
    type: "product",
    item: {_id},
  });

  React.useEffect(() => {
    const ingredientsFilterLength = currentIngredients.filter(item => {
      return item._id === info._id
    }).length
    const bunsFilter = bunIngredient._id === info._id
    setCount(bunsFilter ? 2 : ingredientsFilterLength)
  }, [currentIngredients, count, bunIngredient])




  return (
    <>
    <div className={`${style.card} mt-6`} onClick={handleIngredientClick} ref={dragRef}>
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
      {count > 0 && <Counter count={count}/>}
    </div>
      {productModalOpened && (
        <ModalOverlay info={info} type="product" />
      )}
    </>
  )
}

Product.propTypes = infoRules

