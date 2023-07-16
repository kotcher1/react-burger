import React, {useEffect, useState} from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './feed-item.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from '../../services/hooks'

import { TOrderItem, IMessageResponse } from '../../services/types/types';


export default function FeedItem({changeNav}: {changeNav? : (val: string) => void}) {

  const {id} = useParams()

  const [currentGroup, setCurrentGroup] = useState<IMessageResponse>()
  const [item, setItem] = useState<TOrderItem>()

  const orders = useSelector(store => store.ws.messages)

  const elements: string[] = []

  let summary: number = 0

  useEffect(() => {
    if(changeNav) {
      changeNav('list')
    }

  }, [])

  useEffect(() => {
    if(orders) {
      setCurrentGroup(orders[orders.length - 1])
    }
  }, [orders])

  useEffect(() => {
    const element = currentGroup && currentGroup.orders && currentGroup.orders.find(item => item._id === id)
    setItem(element)
  }, [currentGroup])

  const date = item && new Date(item.createdAt)

  const optionsDate: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  };

  const ingredientsList = useSelector(store => store.ingredients.ingredientsList);

  return (
    <section className={`${style.feedInfo} pt-10`}>
      <div className={`${style.orderCard}`}>
        <p className={`${style.orderNumber} text_type_digits-default`}>
          #{id}
        </p>
        <p className={`${style.orderName} text text_type_main-default mt-10`}>
          {item && item.name}
        </p>
        <p className={`${style.orderStatus} text text_type_main-small mt-3`}>
          {item && item.status === 'done' ? 'Готов' : 'В работе'}
        </p>
        <p className={`${style.compoundTitle} text text_type_main-default mt-15`}>
          Состав
        </p>
        <div className={`${style.componentsBlock} mt-6`}>
          {item && item.ingredients.map((ingredient, index) => {
            if(!elements.includes(ingredient)) {
              const ingredientsSet = ingredientsList.find(ingredientitem => {
                return ingredientitem._id === ingredient
              })
              elements.push(ingredient)
              const price = ingredientsSet && ingredientsSet.price
              const count = item.ingredients.filter(item => item === ingredient).length | 0
              if(price && count) {
                summary += price * count
              }
              return (
                <div key={index} className={`${style.component}`}>
                  <div className={style.componentMainInfo}>
                    <div className={`${style.boxGradient}`}>
                      <div className={style.ingredientImageContainer}>
                        <img src={ingredientsSet && ingredientsSet.image_mobile} className={style.ingredientImage} alt="Ingredient Icon"/>
                      </div>
                    </div>
                    <p className={`${style.componenttitle} text text_type_main-small ml-4`}>
                      Флюоресцентная булка R2-D3
                    </p>
                  </div>
                  <div className={style.priceBlock}>
                    <p className={`${style.price} text text_type_digits-default mr-2`}>
                      {count} x {price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div className={`${style.summaryLine}`}>
          <p className={`${style.orderTime} text text_type_main-small text_color_inactive`}>
            {date && date.toLocaleString("ru", optionsDate)}
          </p>
          <div className={`${style.summaryBlock} pl-6`}>
            <p className={`${style.summaryPrice} text text_type_digits-default mr-2`}>
              {summary}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </section>
  )
}