import React, {useState, useCallback, useEffect} from 'react';

import update from 'immutability-helper'
import PropTypes from 'prop-types';

import style from './sorted-element.module.css'
import dots from '../../images/dots.svg'

import { useSelector, useDispatch } from 'react-redux';

import { ingredientsShape } from '../../utils/prop-types';

import {  
  REMOVE_INGREDIENT_FROM_CURRENTS,
  SORT_CURRENT_INGREDIENT,
} from '../../services/actions/products';

import { useDrop, useDrag } from "react-dnd";

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'

export default function SortedElement({ item, index}) {

  const constructorIngredientsList = useSelector(store => store.ingredients.currentIngredientsList);

  const [cards, setCards] = useState([...constructorIngredientsList])

  const ref = React.useRef(null)

  const dispatch = useDispatch()

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructorItem',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
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

  const moveCard = useCallback((dragIndex, hoverIndex) => {
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
    dispatch({type: SORT_CURRENT_INGREDIENT, list: cards})
  }, [cards])

  useEffect(() => {
    setCards(constructorIngredientsList)
  }, [constructorIngredientsList])

const [{ isDragging }, drag] = useDrag({
    type: 'constructorItem',
    item: () => {
      return { id: `${item._id}${index}`, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  drag(drop(ref))

  const handleDeleteButton = (id, ingredientIndex) => {
    dispatch({type: REMOVE_INGREDIENT_FROM_CURRENTS, item: constructorIngredientsList.filter((ingredient, index) => {
      return ingredient._id !== id || index !== ingredientIndex})
    })
  }

  return (
    <div className={style.line} ref={ref}>
      <img src={dots} className='mr-2' alt=''/>
      <ConstructorElement
        key={item.id}
        isLocked={false}
        text={item.name}
        price={item.price}
        thumbnail={item.image_mobile}
        handleClose={() => handleDeleteButton(item._id, index)}
      />
    </div>
  )
}

SortedElement.propTypes = {
  item: ingredientsShape,
  index: PropTypes.number.isRequired,
}
