import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './modal.module.css'

export default function Modal({close, children}) {

  return (
    <div className={`${style.modal} p-10`}>
      <button className={style.button} onClick={close}>
        <CloseIcon type="primary" />
      </button>
      {children}
    </div>
  )
}

Modal.propTypes = {
  close: PropTypes.func,
  children: PropTypes.element,
}; 