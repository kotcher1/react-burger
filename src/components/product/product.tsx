import React, {useEffect} from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import {TItem} from '../../services/types/types'

import style from './product.module.css'

import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from '../../services/hooks';

import { addCurrentIngredient } from '../../services/actions/products';
import { openModal } from '../../services/actions/modal'

export default function Product({info}: {info: TItem, index?: number}) {

  const {_id} = info;

  const dispatch = useDispatch()

  const [count, setCount] = React.useState<number>(0);
  const currentIngredients = useSelector(state => state.constructors.currentIngredientsList)
  const bunIngredient = useSelector(state => state.constructors.bunIngredient)

  const handleIngredientClick = () => {
    dispatch(addCurrentIngredient(info))
    dispatch(openModal(true, false, false))
  }

  const location = useLocation()

  const [, dragRef] = useDrag({
    type: "product",
    item: {_id},
  });

  React.useEffect(() => {
    const ingredientsFilterLength = currentIngredients.filter((item: TItem) => {
      return item._id === info._id
    }).length
    const bunsFilter = bunIngredient._id === info._id
    setCount(bunsFilter ? 2 : ingredientsFilterLength)
  }, [currentIngredients, count, bunIngredient])

  return (
    <Link
      className={style.link}
      to={`/ingredients/${info._id}`}
      state={{ backgroundLocation: location }}
    >
    <div className={`${style.card} mt-6`} onClick={handleIngredientClick} ref={dragRef}>
      <img src={info.image} alt="Product">
      </img>
      <div className={style.priceBlock}>
        <p className={`${style.price} mr-2 text_type_digits-default`}>
          {info.price}
        </p>
        <CurrencyIcon type={'primary'}/>
      </div>
      <p className={`${style.productName} mt-1 text_type_main-default`}>
        {info.name}
      </p>
      {count > 0 && <Counter count={count}/>}
    </div>
    </Link>
  )
}

