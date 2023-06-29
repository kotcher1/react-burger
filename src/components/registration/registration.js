import React, { useState, useEffect } from 'react';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../form/form.module.css'

import { useSelector, useDispatch } from 'react-redux'

import { register } from '../../services/actions/register'

import { navLinkFunction } from '../../utils/prop-types'

export default function Registration({changeNav}) {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch();

  useEffect(() => {
    changeNav('')
  }, [])

  const handleChangeInput = (e) => {
    if(e.target.name === 'name') {
      setName(e.target.value)
    } else if(e.target.name === 'email') {
      setEmail(e.target.value)
    } else if(e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({name, email, password}))
  }

  const signIn = useSelector(store => store.user.signIn);

  return (
    <div className={styles.form_container}>
      <h2 className={`${styles.title} text_type_main-medium mt-2 mb-0`}>
        Регистрация
      </h2>
      <form className={`${styles.form} text_type_main-medium`}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name={'name'}
          size={'default'}
          extraClass="mt-6"
          value={name}
          onChange={handleChangeInput}
          required={true}
        />
        <EmailInput 
          placeholder="E-mail" 
          value={email}
          name={'email'} 
          extraClass="mt-6"
          onChange={handleChangeInput}
          required={true}
        />
        <PasswordInput
          name={'password'}
          icon='ShowIcon'
          extraClass="mt-6"
          value={password}
          onChange={handleChangeInput}
          required={true}
        />
        <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={handleSubmit}>
          Зарегистрироваться
        </Button>
      </form>
      <div className={`${styles.text_block} mt-20`}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          Уже зарегистрированы? <a className={`${styles.link}`} href="/login">Войти</a>
        </p>
      </div>
    </div>
  )
}

Registration.propsType = navLinkFunction