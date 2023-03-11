import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from './modal-overlay.module.css'

import Modal from '../modal/modal';

const modal = document.getElementById("react-modals");

export default function ModalOverlay({close, type, info = {}}) {

  return ReactDOM.createPortal((
    <div className={style.modal} data-value="back">
      <Modal close={close} type={type} info={info}/>
    </div>
  ), modal)
}

ModalOverlay.propTypes = {
  close: PropTypes.func,
  type: PropTypes.string,
  info: PropTypes.object,
}; 