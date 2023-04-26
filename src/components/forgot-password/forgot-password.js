import React from 'react';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../form/form.module.css'

import { useSelector } from 'react-redux'

export default function ForgotPassword() {

  return (
    <div className={styles.form_container}>
      <h2 className={`${styles.title} text_type_main-medium mt-2 mb-0`}>
        Восстановление пароля
      </h2>
      <form className={`${styles.form} text_type_main-medium`}>
        <EmailInput placeholder="Укажите e-mail" name={'email'} extraClass="mt-6"/>
        <Button htmlType="button" type="primary" size="large" extraClass="mt-6">
          Восстановить
        </Button>
      </form>
      <div className={`${styles.text_block} mt-20`}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          Вспомнили пароль? <a className={`${styles.link}`}>Войти</a>
        </p>
      </div>
    </div>
  )
}