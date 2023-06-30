import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../form/form.module.css'

import { useDispatch } from 'react-redux'

import { register } from '../../services/actions/register'

export default function Registration({changeNav}: {changeNav: (val: string) => void}) {

  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const dispatch = useDispatch();

  useEffect(() => {
    changeNav('')
  }, [])

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.name === 'name') {
      setName(e.target.value)
    } else if(e.target.name === 'email') {
      setEmail(e.target.value)
    } else if(e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    dispatch(register({name, email, password}))
  }

  return (
    <div className={styles.form_container}>
      <h2 className={`${styles.title} text_type_main-medium mt-2 mb-0`}>
        Регистрация
      </h2>
      <form onSubmit={handleSubmit} className={`${styles.form} text_type_main-medium`}>
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
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
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