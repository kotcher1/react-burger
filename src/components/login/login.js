import React from 'react';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../form/form.module.css'

import { useSelector } from 'react-redux'

export default function Login() {

  return (
    <div className={styles.form_container}>
      <h2 className={`${styles.title} text_type_main-medium mt-2 mb-0`}>
        Вход
      </h2>
      <form className={`${styles.form} text_type_main-medium`}>
        <EmailInput placeholder="E-mail" name={'email'} extraClass="mt-6"/>
        <PasswordInput
          name={'password'}
          icon='ShowIcon'
          extraClass="mt-6"
        />
        <Button htmlType="button" type="primary" size="large" extraClass="mt-6">
          Войти
        </Button>
      </form>
      <div className={`${styles.text_block} mt-20`}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь? <a className={`${styles.link}`}>Зарегистрироваться</a>
        </p>
        <p className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}>
          Забыли пароль? <a className={`${styles.link}`}>Восстановить пароль</a>
        </p>
      </div>
    </div>
  )
}