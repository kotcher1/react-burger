import React, {useEffect, useState} from 'react';
import style from './feed.module.css'
import { useSelector } from '../../services/hooks'

import OrderCard from '../order-card/order-card';

import { TOrderItem, TAllOrdersItem, IMessageResponse } from '../../services/types/types';

export default function Feed({changeNav}: {changeNav : (val: string) => void}) {

  const [currentOrder, setCurrentOrder] = useState<IMessageResponse>()
  const [ready, setReady] = useState<Number[]>([])
  const [inProcess, setInProcess] = useState<Number[]>([])

  const orders = useSelector(store => store.ws.messages)

  console.log(orders)

  useEffect(() => {
    changeNav('list')
  }, [])

  useEffect(() => {
    setReady([])
    setInProcess([])
    if(orders) {
      const current = orders[orders.length - 1]
      setCurrentOrder(current)
      if(current && current.orders) {
        current.orders.forEach((item: TOrderItem) => {
          item.status === 'done' ? setReady(prevState => [...prevState, item.number]) :
            setInProcess(prevState => [...prevState, item.number])  
        })
      }
    
    }
  }, [orders])

  return (
    <section className={`${style.feed} pt-10`}>
      <div className={style.container}>
        <h2 className={`${style.title} text text_type_main-large`}>
          Лента заказов
        </h2>
        <div className={`${style.info} mt-5`}>
          <div className={`${style.list} pr-4`}>
            {currentOrder && currentOrder.orders && currentOrder.orders.map((item: TOrderItem, index: number) => {
              return <OrderCard key={index} item={item}/>
            })}
          </div>
          <div className={style.status}>
            <div className={style.statusColumns}>
              <div className={style.statusColumn}>
                <p className={`${style.statusTitle} text text_type_main-medium`}>
                  Готовы:
                </p>
                <div className={`${style.activeOrdersList} mt-6`}>
                  {ready.map((item, index) => {
                    return (
                      <p key={index} className={`${style.activeOrderNumber} text text_type_digits-default ${style.endprocess}`}>
                        {String(item)}
                      </p>
                    )
                  })}
                </div>
              </div>
              <div className={style.statusColumn}>
                <p className={`${style.statusTitle} text text_type_main-medium`}>
                  В работе:
                </p>
                <div className={`${style.activeOrdersList} mt-6`}>
                  {inProcess.map((item, index) => {
                    return (
                      <p key={index} className={`${style.activeOrderNumber} text text_type_digits-default ${style.endprocess}`}>
                        {String(item)}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
            <p className={`${style.statusTitle} mt-15 text text_type_main-medium`}>
              Выполнено за все время:
            </p>
            <p className={`${style.completed} text text_type_digits-large`}>
              {currentOrder && currentOrder.total}
            </p>
            <p className={`${style.statusTitle} mt-15 text text_type_main-medium`}>
              Выполнено за сегодня:
            </p>
            <p className={`${style.completed} text text_type_digits-large`}>
              {currentOrder && currentOrder.totalToday}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}