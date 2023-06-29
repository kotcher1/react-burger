import React, {KeyboardEvent} from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './modal.module.css'
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
}

export default function Modal({type = ''}: {type?: string}) {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  React.useEffect(() => {
    // @ts-ignore
    document.addEventListener('keydown', handleKeyPress);
    // @ts-ignore
    document.addEventListener('click', closeModal)
  
    return () => {
      // @ts-ignore
      document.removeEventListener('keydown', handleKeyPress);
      // @ts-ignore
      document.removeEventListener('click', closeModal)
    };

  }, []);

  const closeModal = (e: HTMLElementEvent<HTMLButtonElement>): void => {
    if(e.target.dataset.value === 'back') {
      close()
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLElement>): void => {
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