import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.css'
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import FeedItem from '../feed-item/feed-item';
import { useDispatch } from '../../services/hooks'
import { useNavigate } from 'react-router-dom';

import { closeModal as closeModalAction } from '../../services/actions/modal'
import { addCurrentIngredient } from '../../services/actions/products'

interface KeyboardEvent {
  key: string;
}

export default function Modal({type = '', page}: {type?: string, page?: string}) {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', closeModal)
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', closeModal)
    };

  }, []);

  const closeModal = (e: Event): void => {
    if (!e.target)
      return

    const target = e.target as Element
    if(target.classList.contains('back')) {
      close()
    }
  }

  const handleKeyPress = (e: KeyboardEvent): void => {
    if(e.key === 'Escape') {
      close()
    }
  }

  const close = () => {
    dispatch(closeModalAction())
    dispatch(addCurrentIngredient({
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      __v: 0,
      calories: 0,
      carbohydrates: 0,
      image_large: '',
      image_mobile: '',
      price: 0,
      image: '',
    }))
    if(type === 'product') {
      navigate('/')
    }
    if(type === 'orderInfo' && page === "feed") {
      navigate('/feed')
    } else if ((type === 'orderInfo')) {
      navigate('/profile/order')
    }
  }

  return (
    <div className={`${style.modal} p-10`}>
      <button className={style.button} onClick={close}>
        <CloseIcon type="primary" />
      </button>
      {type === 'product' && <IngredientDetails />}
      {type === 'order' && <OrderDetails />}
      {type === 'orderInfo' && <FeedItem />}
    </div>
  )
}