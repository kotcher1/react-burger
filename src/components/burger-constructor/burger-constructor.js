import React, {useState, useEffect} from 'react';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../modal-overlay/modal-overlay';

import style from './burger-constructor.module.css'

import { addId } from '../../services/actions/order'

import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from 'react-redux';

import SortedElement from '../sorted-element/sorted-element'

export default function BurgerConstructor() {

  const [price, setPrice] = useState(0)

  const dispatch = useDispatch()
  const constructorIngredientsList = useSelector(store => store.constructors.currentIngredientsList);
  const ingredientsList = useSelector(store => store.ingredients.ingredientsList);
  const bunIngredient = useSelector(store => store.constructors.bunIngredient);
  const orderModalOpened = useSelector(store => store.modal.orderModalOpened);

  const handleClick = () => {
    const ingredients = []
    constructorIngredientsList.map(item => {
      return ingredients.push(item._id)
    })
    ingredients.push(bunIngredient._id)
    ingredients.unshift(bunIngredient._id)
    dispatch(addId(ingredients))
    dispatch({
      type: 'OPEN_MODAL',
      product: false,
      order: true.valueOf,
    })
  }

  const [, dropTarget] = useDrop({
    accept: "product",
    drop(itemId) {
      const item = ingredientsList.filter(ingredient => {
        return ingredient._id === itemId._id})
      if(item[0].type !== 'bun') {
        dispatch({type: 'ADD_INGREDIENT_TO_CURRENTS', item
        })
      } else {
        dispatch({type: 'ADD_BUN', item})
      }
    } 
  });

  useEffect(() => {
    let ingredientPrice = 0;
    constructorIngredientsList.length > 0 && constructorIngredientsList.map((item) => ingredientPrice += item.price)
    const bunPrice = bunIngredient ? bunIngredient.price * 2 : 0
    setPrice(ingredientPrice + bunPrice)
  }, [constructorIngredientsList, bunIngredient])


  return (
    <section className={`${style.constructor} ml-10 mt-25 pl-4 pr-4`}>
            <div className={style.block} ref={dropTarget
            }>
              {bunIngredient && (
                <div className='mr-6'>
                  <ConstructorElement
                    key={`${bunIngredient.id}top`}
                    type='top'
                    isLocked={true}
                    text={`${bunIngredient.name} (верх)`}
                    price={bunIngredient.price}
                    thumbnail={bunIngredient.image_mobile}
                  />
                </div>
              )}
              {constructorIngredientsList.length > 0 && (
                <div className={`${style.ingredients} pr-4`}>
                  {constructorIngredientsList.map((item, index) => {
                      return <SortedElement item={item} index={index} key={`${item._id}${index}`} />
                  })}
                </div>
              )}
              {bunIngredient && (
                <div className='mr-6'>
                  <ConstructorElement
                    key={`${bunIngredient.id}bottom`}
                    type='bottom'
                    isLocked={true}
                    text={`${bunIngredient.name} (низ)`}
                    price={bunIngredient.price}
                    thumbnail={bunIngredient.image_mobile}
                  />
                </div>
              )}
          </div>
      <div className={`${style.buttons} mt-10 mr-4`}>
        <div className={`${style.price} mr-10`}>
          <p className={`${style.priceNumber} mr-2 text_type_digits-medium`}>{price}</p>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
          Оформить заказ
        </Button>
      </div>
      {orderModalOpened && (
        <ModalOverlay />
      )}
    </section>
  )
}