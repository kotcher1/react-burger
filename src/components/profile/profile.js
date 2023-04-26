import React from 'react';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './profile.module.css'

import { useSelector } from 'react-redux'

export default function Profile() {

  return (
    <div className={`${styles.page} pt-30`}>
      <div className={`${styles.pageColumn} ${styles.navigation}`}>
        <p className={`${styles.button} text text_type_main-medium`}>
          Профиль
        </p>
        <p className={`${styles.button} text text_type_main-medium text_color_inactive`}>
          История заказов
        </p>
        <p className={`${styles.button} text text_type_main-medium text_color_inactive`}>
          Выход
        </p>
        <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете 
          <br/>изменить свои персональные данные
        </p>  
      </div>
      <div className={styles.formColumn}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          size={'default'}
          icon={'EditIcon'}
          value={'Марк'}
        />
        <EmailInput 
          placeholder="E-mail" 
          name={'email'} 
          extraClass="mt-6"
          icon={'EditIcon'}
        />
        <PasswordInput
          name={'password'}
          extraClass="mt-6"
          icon={'EditIcon'}
          value='jgjhf'
        />
      </div>
      <div className={styles.pageColumn}>

      </div>
    </div>
  )
}