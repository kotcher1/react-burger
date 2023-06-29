import React from 'react';
import * as ReactDOM from 'react-dom';

import style from './modal-overlay.module.css'

import Modal from '../modal/modal';

const modal = document.getElementById("react-modals");

export default function ModalOverlay({type}: {type?: string}) {

  return ReactDOM.createPortal((
    <div className={style.modal} data-value="back">
      <Modal type={type}/>
    </div>
  
  //@ts-ignore
  ), modal)
}