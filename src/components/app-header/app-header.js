import React from 'react';

import style from './app-header.module.css'

import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader() {
  return (
    <header className={`${style.header} pl-10 pr-10 pt-10`}>
      <div className={`${style.container} pt-4 pb-4`}>
        <div className={`${style.togglers}`}>
          <button className={`${style.button} p-5`}>
            <BurgerIcon />
            <p className={`${style.buttonTitle} text_type_main-small pl-2`}>
              Конструктор
            </p>
          </button>
          <button className={`${style.button} p-5 ml-2`}>
            <ListIcon type="secondary"/>
            <p className={`${style.buttonTitle} text_color_inactive text_type_main-small pl-2`}>
              Лента заказов
            </p>
          </button>
        </div>
        <Logo/>
        <div className={style.userButton}>
          <button className={`${style.button} p-5`}>
            <ProfileIcon type="secondary"/>
            <p className={`${style.buttonTitle} text_color_inactive text_type_main-small pl-2`}>
              Личный кабинет
            </p>
          </button>
        </div>
      </div>
    </header>
  )
}