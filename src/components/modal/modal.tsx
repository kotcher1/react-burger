import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.css'
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

interface KeyboardEvent {
  key: string;
}

export default function Modal({type = ''}: {type?: string}) {

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
    dispatch({type: 'CLOSE_MODAL'})
    dispatch({type: 'ADD_CURRENT_INGREDIENT', item: {}})
    if(type === 'product') {
      navigate('/')
    }
  }

  return (
    <div className={`${style.modal} p-10`}>
      <button className={style.button} onClick={close}>
        <CloseIcon type="primary" />
      </button>
      {type === 'product' ? <IngredientDetails /> : <OrderDetails />}
    </div>
  )
}