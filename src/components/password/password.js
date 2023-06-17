import React, {useState, useEffect} from 'react';

import { Navigate } from 'react-router-dom';

import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../form/form.module.css'

import { useSelector, useDispatch } from 'react-redux'

import { resetPassword } from '../../services/actions/user'

import { navLinkFunction } from '../../utils/prop-types'

export default function Password({changeNav}) {

  const [newPasswordInfo, setInfo] = useState({
    password: '',
    token: '',
  })

  const dispatch = useDispatch();

  useEffect(() => {
    changeNav('')
  }, [])

  function handleChangeInput(e) {
    setInfo(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(resetPassword(newPasswordInfo))
  }

  const passwordReset = useSelector(state => state.user.passwordReset)

  return !passwordReset ? (
    <div className={styles.form_container}>
      <h2 className={`${styles.title} text_type_main-medium mt-2 mb-0`}>
        Восстановление пароля
      </h2>
      <form onSubmit={handleSubmit} className={`${styles.form} text_type_main-medium`}>
        <PasswordInput
          name={'password'}
          icon='ShowIcon'
          extraClass="mt-6"
          placeholder="Введите новый пароль"
          value={newPasswordInfo.password}
          onChange={handleChangeInput}
          required={true}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          name={'token'}
          size={'default'}
          extraClass="mt-6"
          value={newPasswordInfo.token}
          onChange={handleChangeInput}
          required={true}
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
          Сохранить
        </Button>
      </form>
      <div className={`${styles.text_block} mt-20`}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          Вспомнили пароль? <a className={`${styles.link}`} href="/login">Войти</a>
        </p>
      </div>
    </div>
  ) : (
    <Navigate to="/login"/>
  )
}

Password.propsType = navLinkFunction