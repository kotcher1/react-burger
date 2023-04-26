import React from 'react';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../form/form.module.css'

import { useSelector } from 'react-redux'

export default function Password() {

  return (
    <div className={styles.form_container}>
      <h2 className={`${styles.title} text_type_main-medium mt-2 mb-0`}>
        Восстановление пароля
      </h2>
      <form className={`${styles.form} text_type_main-medium`}>
        <PasswordInput
          name={'password'}
          icon='ShowIcon'
          extraClass="mt-6"
          placeholder="Введите новый пароль"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'name'}
          size={'default'}
          extraClass="mt-6"
        />
        <Button htmlType="button" type="primary" size="large" extraClass="mt-6">
          Сохранить
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