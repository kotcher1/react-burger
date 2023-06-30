import React from 'react';
import * as ReactDOM from 'react-dom';

import style from './modal-overlay.module.css'

import Modal from '../modal/modal';

const modal = document.getElementById("react-modals") as HTMLElement;

export default function ModalOverlay({type}: {type?: string}) {

  return ReactDOM.createPortal((
    <div className={`${style.modal} back`}>
      <Modal type={type}/>
    </div>
  ), modal)
}