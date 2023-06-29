import React, {useEffect, useRef} from 'react';
import Product from '../product/product';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import { addIngredients } from '../../services/actions/products'
import { TItem } from '../../utils/types'

import style from './burger-ingredients.module.css'

export default function BurgerIngredients() {

  const [current, setCurrent] = React.useState<string>('one')

  const tabs = useRef<HTMLDivElement>(null)
  const firstСhapter = useRef<HTMLDivElement>(null)
  const secondСhapter = useRef<HTMLDivElement>(null)
  const thirdChapter = useRef<HTMLDivElement>(null)

  const scrollWindow = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  // @ts-ignore
  const ingredientsList = useSelector(store => store.ingredients.ingredientsList);

  useEffect(() => {
    const tabTop = tabs.current && tabs.current.getBoundingClientRect().top + 200;
    const tabBottom = tabs.current && tabs.current.getBoundingClientRect().top - 300;
    // @ts-ignore
    dispatch(addIngredients())
    if(scrollWindow.current) {
      scrollWindow.current.addEventListener('scroll', () => {
        if(tabTop && tabBottom) {
          if(firstСhapter.current && firstСhapter.current.getBoundingClientRect().top < tabTop && firstСhapter.current.getBoundingClientRect().top > tabBottom) {
            setCurrent('one')
          } else if(secondСhapter.current && secondСhapter.current.getBoundingClientRect().top < tabTop && secondСhapter.current.getBoundingClientRect().top > tabBottom) {
            setCurrent('two')
          } else if (thirdChapter.current && thirdChapter.current.getBoundingClientRect().top < tabTop && thirdChapter.current.getBoundingClientRect().top > tabBottom) {
            setCurrent('three')
          }
        }
      })
    }
  }, [])

  return (
    <section className={`${style.burgerIngredients} mt-10`}>
      <p className={`${style.title} text_type_main-large`}>
        Соберите бургер
      </p>
      <div style={{ display: 'flex' }} ref={tabs} className="mt-5">
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${style.container}`} ref={scrollWindow}>
        <div className={`${style.productSection}  mt-10`} ref={firstСhapter}>
          <p className={`${style.containerTitle} m-0 text_type_main-medium`}>
            Булки
          </p>
          <div className={`${style.block} pl-4 pr-4`}>
            {ingredientsList.map((item: TItem, index: number) => {
              if(item.type === 'bun') {
                return <Product info={item} index={index} key={item._id}/>
              }
            })}
          </div>
        </div>
        <div className={`${style.productSection}  mt-10`} ref={secondСhapter}>
          <p className={`${style.containerTitle} m-0 text_type_main-medium`}>
            Соусы
          </p>
          <div className={`${style.block} pl-4 pr-4`}>
            {ingredientsList.map((item: TItem) => {
              if(item.type === 'sauce') {
                {/*@ts-ignore*/ }
                return <Product info={item} key={item._id}/>
              }
            })}
          </div>
        </div>
        {/*@ts-ignore*/ }
        <div className={`${style.productSection}  mt-10`} ref={thirdChapter}>
          <p className={`${style.containerTitle} m-0 text_type_main-medium`}>
            Начинки
          </p>
          <div className={`${style.block} pl-4 pr-4`}>
            {ingredientsList.map((item: TItem) => {
              if(item.type === 'main') {
                {/*@ts-ignore*/ }
                return <Product info={item} key={item._id}/>
              }
            })}
          </div>
        </div>
      </div>
    </section>
  )
}