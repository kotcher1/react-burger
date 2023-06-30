import React, {useState, useCallback, useEffect} from 'react';

import update from 'immutability-helper'

import style from './sorted-element.module.css'
import dots from '../../images/dots.svg'

import { useSelector, useDispatch } from 'react-redux';

import { TItem } from '../../utils/types';
//@ts-ignore
import { v4 as uuid } from 'uuid'

import { useDrop, useDrag } from "react-dnd";

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

export default function SortedElement({item, index}: {item: TItem, index: number}) {
  //@ts-ignore
  const constructorIngredientsList = useSelector(store => store.constructors.currentIngredientsList);

  const [cards, setCards] = useState([...constructorIngredientsList])

  const ref = React.useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorItem',
    collect: monitor => {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover: (item: {id: string, index: number}, monitor: any) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards) => 
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  useEffect(() => {
    dispatch({type: 'SORT_CURRENT_INGREDIENT', list: cards})
  }, [cards])

  useEffect(() => {
    setCards(constructorIngredientsList)
  }, [constructorIngredientsList])

const [{ isDragging }, drag] = useDrag({
    type: 'constructorItem',
    item: () => {
      return { id: uuid(), index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drag(drop(ref))

  const handleDeleteButton = (id: string, ingredientIndex: number) => {
    dispatch({type: 'REMOVE_INGREDIENT_FROM_CURRENTS', item: constructorIngredientsList.filter((ingredient: TItem, index: number) => {
      return ingredient._id !== id || index !== ingredientIndex})
    })
  }

  return (
    <div className={style.line} ref={ref}>
      <img src={dots} className='mr-2' alt=''/>
      <ConstructorElement
        key={item._id}
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => handleDeleteButton(item._id, index)}
      />
    </div>
  )
}
