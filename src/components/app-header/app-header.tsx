import style from './app-header.module.css'

import { Link } from 'react-router-dom';

import { Logo, BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export default function AppHeader({active = ''}: {active: string}) {

  return (
    <header className={`${style.header} pl-10 pr-10 pt-10`}>
      <div className={`${style.container} pt-4 pb-4`}>
        <div className={`${style.togglers}`}>
          <Link className={style.link} to="/">
            <div className={`${style.button} p-5`}>
              <BurgerIcon type={active === 'constructor' ? 'primary' : 'secondary'}/>
              <p className={`${active === 'constructor' ? style.buttonTitle : 'text_color_inactive'} text_type_main-small pl-2`}>
                Конструктор
              </p>
            </div>
          </Link>
          <Link className={style.link} to="/feed">
            <div className={`${style.button} p-5`}>
              <ListIcon type={active === 'list' ? 'primary' : 'secondary'}/>
              <p className={`${active === 'list' ? style.buttonTitle : 'text_color_inactive'} text_type_main-small pl-2`}>
                Лента заказов
              </p>
            </div>
          </Link>
        </div>
        <Logo/>
        <div className={style.userButton}>
          <Link className={style.link} to="/profile">
            <div className={`${style.button} p-5`}>
              <ProfileIcon type={active === 'profile' ? 'primary' : 'secondary'}/>
              <p className={`${active === 'profile' ? style.buttonTitle : 'text_color_inactive'} text_type_main-small pl-2`}>
                Личный кабинет
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}