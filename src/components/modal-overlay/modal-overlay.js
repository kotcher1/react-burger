import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from './modal-overlay.module.css'

import Modal from '../modal/modal';

const modal = document.getElementById("react-modals");

export default function ModalOverlay({close, children}) {

  React.useEffect(() => {
  
    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
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

  return ReactDOM.createPortal((
    <div className={style.modal} data-value="back" onClick={closeModal}>
      <Modal close={close}>
        {children}
      </Modal>
    </div>
  ), modal)
}

ModalOverlay.propTypes = {
  close: PropTypes.func,
  children: PropTypes.element,
}; 