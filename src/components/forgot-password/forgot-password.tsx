import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';

import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from '../form/form.module.css'

import { useSelector, useDispatch } from '../../services/hooks'

import { forgotPassword } from '../../services/actions/user'
import { Navigate } from 'react-router-dom';

export default function ForgotPassword({changeNav}: {changeNav: (val :string) => void}) {

  const [email, setEmail] = useState<string>('')

  const dispatch = useDispatch();

  useEffect(() => {
    changeNav('')
  }, [])

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(forgotPassword(email))
  }

  const passwordRequest = useSelector(state => state.user.passwordRequest)

  return !passwordRequest ? (
    <div className={styles.form_container}>
      <h2 className={`${styles.title} text_type_main-medium mt-2 mb-0`}>
        Восстановление пароля
      </h2>
      <form onSubmit={handleSubmit} className={`${styles.form} text_type_main-medium`}>
        <EmailInput placeholder="Укажите e-mail" name={'email'} extraClass="mt-6" value={email} onChange={handleInputChange} required={true}/>
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
          Восстановить
        </Button>
      </form>
      <div className={`${styles.text_block} mt-20`}>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          Вспомнили пароль? <a href="/login" className={`${styles.link}`}>Войти</a>
        </p>
      </div>
    </div>
  ) : (
    <Navigate to={"/reset-password"}/>
  )
}