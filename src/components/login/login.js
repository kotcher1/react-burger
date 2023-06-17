import React, { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../form/form.module.css'

import { useDispatch, connect } from 'react-redux'

import { login } from '../../services/actions/login'

import PropTypes from 'prop-types';

function Login({signIn, changeNav}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    changeNav('')
  }, [])

  const handleChangeInput = (e) => {
    if(e.target.name === 'email') {
      setEmail(e.target.value)
    } else if(e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({email, password}))
  }

  return !signIn ? (
    <div className={styles.form_container}>
      <h2 className={`${styles.title} text_type_main-medium mt-2 mb-0`}>
        Вход
      </h2>
      <form className={`${styles.form} text_type_main-medium`}>
        <EmailInput placeholder="E-mail" name={'email'} extraClass="mt-6" onChange={handleChangeInput} required={true}/>
        <PasswordInput
          name={'password'}
          icon='ShowIcon'
          extraClass="mt-6"
          onChange={handleChangeInput}
          required={true}
        />
        <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={handleSubmit}>
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
  ) : (
    <Navigate to={"/"}/>
  )
}

export default connect(
  (state) => ({signIn: state.user.signIn})
)(Login)

Login.propsType = {
  changeNav: PropTypes.func,
  signIn: PropTypes.bool,
}