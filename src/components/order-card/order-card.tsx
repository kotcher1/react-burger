import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './order-card.module.css'

import { useDispatch, useSelector } from '../../services/hooks'

import { Link, useLocation } from 'react-router-dom';

import { openModal } from '../../services/actions/modal'

import { TOrderItem } from '../../services/types/types'

import { setWSCurrentOrder } from '../../services/actions/wsFeed';

export default function OrderCard({item, block} : {item: TOrderItem, block?: string}) {

  const location = useLocation()

  const dispatch = useDispatch()

  const handleIngredientClick = () => {
    dispatch(openModal(false, false, true))
    dispatch(setWSCurrentOrder(item))
  }

  let summary = 0

  const date = new Date(item.createdAt)

  const optionsDate: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
  };


  const ingredientsList = useSelector(store => store.ingredients.ingredientsList);

  return (
    <Link state={{ backgroundLocation: location }} onClick={handleIngredientClick} to={block ? `/profile/orders/${item._id}` : `/feed/${item._id}`} className={`${style.orderCard} p-6`}>
      <div className={style.numberLine}>
        <p className={`${style.orderNumber} text_type_digits-default`}>
          {item._id}
        </p>
        <p className={`${style.orderTime} text text_type_main-small text_color_inactive`}>
          {date.toLocaleString("ru", optionsDate)}
        </p>
      </div>
      <p className={`${style.orderName} text text_type_main-default pt-6`}>
        {item.name}
      </p>
      <div className={`${style.ingredientsLine} pt-6`}>
        <div className={`${style.ingredientsBox}`}>
          {item.ingredients.map((itemIngredient, index) => {
            if(index <= 5) {
              const ingredientInfo = ingredientsList.find(ingredientitem => {
                return ingredientitem._id === itemIngredient
              })
              if(ingredientInfo) {
                summary += ingredientInfo.price
              } 
              if(index !== 0) {
                return (
                  <div key={index} className={`${style.boxGradient}`}>
                    <div className={style.ingredientImageContainer}>
                      <img src={ingredientInfo && ingredientInfo.image_mobile} className={style.ingredientImage} alt="Ingredient Icon"/>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className={`${style.boxGradient}`}>
                    <div className={style.ingredientImageContainer}>
                      <img src={ingredientInfo && ingredientInfo.image_mobile} className={style.ingredientImage} alt="Ingredient Icon"/>
                      {item.ingredients.length > 6 && (
                        <div className={style.mask}>
                          <p className={`${style.maskTitle} text text_type_main-small`}>
                            + {item.ingredients.length - 5}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              }
            }
          })}
        </div>
        <div className={`${style.priceBlock} pl-6`}>
          <p className={`${style.price} text text_type_digits-default mr-2`}>
            {summary}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  )
}