import React, {useState, useEffect} from 'react';

import { EmailInput, PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './profile.module.css'

import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../services/actions/logout'

import { changeUser } from '../../services/actions/user'

import { Link, useParams } from 'react-router-dom';

import { navLinkFunction } from '../../utils/prop-types'

export default function Profile({changeNav}) {

  const userName = useSelector((state) => state.user.name)
  const userEmail = useSelector((state) => state.user.email)
  const userPassword = useSelector((state) => state.user.password)
  const accessToken = useSelector((state) => state.user.accessToken)

  const [form, setFormValue] = useState({
    name: userName,
    email: userEmail,
    password: userPassword,
  })

  const [buttonsState, setButtonsState] = useState(false)

  const dispatch = useDispatch();

  useEffect(() => {
    changeNav('profile')
  }, [])

  function clickLogoutButton() {
    dispatch(logout())
  }

  function handleChange(e) {
    setButtonsState(true);
    setFormValue(prevState => {
      return {...prevState, [e.target.name]: e.target.value}
    })
  }

  function handleClickSave() {
    dispatch(changeUser(form, accessToken))
    setButtonsState(false)
  }

  function handleClickReset() {
    setFormValue({
      name: userName,
      email: userEmail,
      password: userPassword,
    })
    setButtonsState(false)
  }

  const {section} = useParams()

  return (
    <div className={`${styles.page} pt-30`}>
      <div className={`${styles.pageColumn} ${styles.navigation}`}>
        <Link className={styles.link} to="/profile">
          <p className={`${styles.button} ${section ? '' : styles.buttonActive} text text_type_main-medium`}>
            Профиль
          </p>
        </Link>
        <Link className={styles.link} to="/profile/orders">
          <p className={`${styles.button} ${section ? styles.buttonActive : ''} text text_type_main-medium`}>
            История заказов
          </p>
        </Link>
        <p onClick={clickLogoutButton} className={`${styles.button} text text_type_main-medium text_color_inactive`}>
          Выход
        </p>
        <p className={`${styles.text} text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете 
          <br/>изменить свои персональные данные
        </p>  
      </div>
      {!section && (
        <div className={styles.formColumn}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            name={'name'}
            size={'default'}
            icon={'EditIcon'}
            value={form.name}
            onChange={handleChange}
          />
          <EmailInput 
            placeholder="E-mail" 
            name={'email'} 
            extraClass="mt-6"
            icon={'EditIcon'}
            value={form.email}
            onChange={handleChange}
          />
          <PasswordInput
            name={'password'}
            extraClass="mt-6"
            icon={'EditIcon'}
            value={form.password}
            onChange={handleChange}
          />
          {buttonsState && (
            <div className={`${styles.buttonsLine} mt-6`}>
              <Button htmlType="button" type="primary" size="medium" onClick={handleClickSave}>
                Сохранить
              </Button>
              <Button htmlType="button" type="secondary" size="medium" onClick={handleClickReset}>
                Отмена
              </Button>
            </div>
          )}
        </div>
      )}
      <div className={styles.pageColumn}>

      </div>
    </div>
  )
}

Profile.propsType = navLinkFunction