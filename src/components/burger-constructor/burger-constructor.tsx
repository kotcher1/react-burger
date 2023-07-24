import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'

import style from './burger-constructor.module.css'

import { addId } from '../../services/actions/order'
import ModalOverlay from '../modal-overlay/modal-overlay';

import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from '../../services/hooks';

import SortedElement from '../sorted-element/sorted-element'

import { TItem } from '../../services/types/types'

import { openModal } from '../../services/actions/modal' 
import { addIngredientToCurrents, setIngredients as set, addBun } from '../../services/actions/constructor' 

export default function BurgerConstructor() {

  const [price, setPrice] = useState<number>(0)
  const [ingredients, setIngredients] = useState<TItem[]>([])
  const [prevBun, setPrevBun] = useState<TItem>()

  const navigation = useNavigate()

  const dispatch = useDispatch()
  const constructorIngredientsList = useSelector(store => store.constructors.currentIngredientsList);
  const ingredientsList = useSelector(store => store.ingredients.ingredientsList);
  const bunIngredient = useSelector(store => store.constructors.bunIngredient);
  const signIn = useSelector(store => store.user.signIn);
  const orderModalOpened = useSelector(store => store.modal.orderModalOpened);

  const handleClick = () => {
    if(!signIn) {
      navigation('/login')
    } else {
      const ingredients: String[] = []
      constructorIngredientsList.map((item: TItem) => {
        return ingredients.push(item._id)
      })
      if(bunIngredient._id) {
        ingredients.push(bunIngredient._id)
        ingredients.unshift(bunIngredient._id)
      }
      dispatch(addId(ingredients))
      dispatch(openModal(false, true, false))
    }
  }

  const [, dropTarget] = useDrop({
    accept: "product",
    drop: (itemId: {_id: string}) => {
      const item = ingredientsList.filter((ingredient: TItem) => {
        return ingredient._id === itemId._id})
      if(item[0].type !== 'bun') {
        dispatch(addIngredientToCurrents(item))
        localStorage.setItem('ingredients', JSON.stringify(constructorIngredientsList))
      } else {
        dispatch({type: 'ADD_BUN', item})
        localStorage.setItem('bun', JSON.stringify(item[0]))
        if(!prevBun){
          const bunPrice = item[0] ? item[0].price * 2 : 0
          localStorage.setItem('price', `${price + bunPrice}`)
          setPrice(prevState => prevState + bunPrice)
        }
      }

    }
  });

  useEffect(() => {
    if(constructorIngredientsList.length > 0) {
      setPrice(0)
      constructorIngredientsList.map((item: TItem) => setPrice(prev => prev += item.price))
      const bunPrice = bunIngredient && bunIngredient.price ? bunIngredient.price * 2 : 0
      localStorage.setItem('price', `${price + bunPrice}`)
      setPrice(prevState => prevState + bunPrice)
      localStorage.setItem('ingredients', JSON.stringify(constructorIngredientsList))
    }
    if((prevBun && prevBun.name !== bunIngredient.name) || !prevBun) {
      if(prevBun) {
        const bunPrice = bunIngredient && bunIngredient.price ? bunIngredient.price * 2 : 0
        const prevBunPrice = prevBun ? prevBun.price * 2 : 0
        localStorage.setItem('price', `${price + bunPrice - prevBunPrice}`)
        setPrice(Number(localStorage.getItem('price')))
      }
      setPrevBun(bunIngredient)
    }
    if (localStorage.getItem('ingredients') && ingredients.length && constructorIngredientsList.length > ingredients.length) {
      setIngredientsToStore()
    }
  }, [constructorIngredientsList, bunIngredient])

  useEffect(() => {
    if(localStorage.getItem('ingredients')) {
      setIngredientsToStore()
    }
    if(localStorage.getItem('bun')) {
      setBunToStore()
    }
    if(localStorage.getItem('price')) {
      setPrice(Number(localStorage.getItem('price')))
    }
  }, [])

  function setIngredientsToStore() {
    setIngredients(constructorIngredientsList)
    const storage: string | null = localStorage.getItem('ingredients')
    if(storage) {
      const ing = JSON.parse(storage)
      dispatch(set(ing))
    }
  }

  function setBunToStore() {
    const storage: string | null = localStorage.getItem('bun')
    if(storage) {
      const bun: TItem = JSON.parse(storage)
      dispatch(addBun([bun]))
    }
  }

  return (
    <section className={`${style.constructor} ml-10 mt-25 pl-4 pr-4`}>
      <div className={style.block} ref={dropTarget}>
        {bunIngredient && bunIngredient._id && (
          <div className='mr-6'>
            <ConstructorElement
              key={`${bunIngredient._id}top`}
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
            {constructorIngredientsList.map((item: TItem, index: number) => {
                return <SortedElement item={item} index={index} key={`${item._id}${index}`} />
            })}
          </div>
        )}
        {bunIngredient && bunIngredient._id && (
          <div className='mr-6'>
            <ConstructorElement
              key={`${bunIngredient._id}bottom`}
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
          <CurrencyIcon type={"primary"}/>
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={handleClick}>
          Оформить заказ
        </Button>
      </div>
      {orderModalOpened && (
        <ModalOverlay type="order"/>
      )}
    </section>
  )
}