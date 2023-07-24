import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../form/form.module.css'

import { useDispatch } from '../../services/hooks'

import { login } from '../../services/actions/login'

export default function Login({changeNav}: {changeNav: (val: string) => void}) {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useDispatch();

  useEffect(() => {
    changeNav('')
  }, [])

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'email') {
      setEmail(e.target.value)
    } else if(e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({email, password}))
  }

  return (
    <div className={styles.form_container}>
      <h2 className={`${styles.title} text_type_main-medium mt-2 mb-0`}>
        Вход
      </h2>
      <form onSubmit={handleSubmit} className={`${styles.form} text_type_main-medium`}>
        <EmailInput placeholder="E-mail" name={'email'} extraClass="mt-6" onChange={handleChangeInput} value={email} required={true}/>
        <PasswordInput
          name={'password'}
          icon='ShowIcon'
          extraClass="mt-6"
          onChange={handleChangeInput}
          required={true}
          value={password}
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
          Войти
        </Button>
      </form>
      <div className={`${styles.text_block} mt-20`}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь? <a className={`${styles.link}`} href="/register">Зарегистрироваться</a>
        </p>
        <p className={`${styles.text} text text_type_main-default text_color_inactive mt-4`}>
          Забыли пароль? <a className={`${styles.link}`} href="/forgot-password">Восстановить пароль</a>
        </p>
      </div>
    </div>
  )
}