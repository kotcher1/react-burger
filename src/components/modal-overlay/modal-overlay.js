import React from 'react';
import * as ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from './modal-overlay.module.css'

import Modal from '../modal/modal';

const modal = document.getElementById("react-modals");

export default function ModalOverlay({type}) {

  return ReactDOM.createPortal((
    <div className={style.modal} data-value="back">
      <Modal type={type}/>
    </div>
  ), modal)
}

ModalOverlay.propTypes = {
  type: PropTypes.string,
}; 