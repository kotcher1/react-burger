import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './modal.module.css'
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';

export default function Modal({close, type = '', info}) {

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', closeModal)
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', closeModal)
    };

  }, []);

  const closeModal = (e) => {
    if(e.target.dataset.value === 'back') {
      close()
    }
  }

  const handleKeyPress = (e) => {
    if(e.key === 'Escape') {
      close()
    }
  }

  return (
    <div className={`${style.modal} p-10`}>
      <button className={style.button} onClick={close}>
        <CloseIcon type="primary" />
      </button>
      {type === 'product' ? <IngredientDetails info={info}/> : <OrderDetails />}
    </div>
  )
}

Modal.propTypes = {
  close: PropTypes.func,
  type: PropTypes.string,
  info: PropTypes.object,
}; 