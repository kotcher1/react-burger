import React from 'react';
import PropTypes from 'prop-types';

import { ingredientRules } from '../../utils/prop-types';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';

import style from './burger-constructor.module.css'

import dots from '../../images/dots.svg'
import OrderDetails from '../order-details/order-details';

export default function BurgerConstructor({ingredients}) {

  const [isModalOpened, setIsModalOpened] = React.useState(false)

  const changeModalStatus = () => {
    setIsModalOpened(!isModalOpened)
  }

  return (
    <section className={`${style.constructor} ml-10 mt-25 pl-4 pr-4`}>
      {ingredients.length > 0 && (
            <div className={style.block}>
              <div className='mr-6'>
                <ConstructorElement
                  key={ingredients[0].id}
                  type='top'
                  isLocked={true}
                  text={`${ingredients[0].name} (верх)`}
                  price={ingredients[0].price}
                  thumbnail={ingredients[0].image_mobile}
                />
              </div>
              <div className={`${style.ingredients} pr-4`}>
                {ingredients.map((item, index) => {
                  if(index !== 0) {
                    return (
                      <div className={style.line} key={item._id}>
                        <img src={dots} className='mr-2' alt=''/>
                        <ConstructorElement
                          key={item.id}
                          isLocked={false}
                          text={item.name}
                          price={item.price}
                          thumbnail={item.image_mobile}
                        />
                      </div>
                    )
                }})}
              </div>
              <div className='mr-6'>
                <ConstructorElement
                  key={ingredients[0].id}
                  type='bottom'
                  isLocked={true}
                  text={`${ingredients[0].name} (низ)`}
                  price={ingredients[0].price}
                  thumbnail={ingredients[0].image_mobile}
                />
              </div>
          </div>
      )}
      <div className={`${style.buttons} mt-10 mr-4`}>
        <div className={`${style.price} mr-10`}>
          <p className={`${style.priceNumber} mr-2 text_type_digits-medium`}>610</p>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={changeModalStatus}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpened && (
        <ModalOverlay close={changeModalStatus} />
      )}
    </section>
  )
}

BurgerConstructor.propTypes = ingredientRules