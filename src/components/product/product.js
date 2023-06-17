import React, {useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { infoRules } from '../../utils/prop-types';

import style from './product.module.css'

import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';

export default function Product({info}) {

  const {_id} = info;

  const dispatch = useDispatch()

  const navigate = useNavigate()


  const [count, setCount] = React.useState(0);

  const currentIngredients = useSelector(state => state.constructors.currentIngredientsList)
  const bunIngredient = useSelector(state => state.constructors.bunIngredient)

  const currentIngredient = useSelector(store => store.ingredients.currentIngredient)


  const handleIngredientClick = () => {
    dispatch({type: 'ADD_CURRENT_INGREDIENT', item: info})
    dispatch({type: 'OPEN_MODAL', product: true, order: false})
  }

  useEffect(() => {
    if(currentIngredient._id) {
      navigate(`/ingredients/${currentIngredient._id}`)
    }
  }, [currentIngredient])

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
    </>
  )
}

Product.propTypes = infoRules

