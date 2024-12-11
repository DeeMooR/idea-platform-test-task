import React from 'react'
import { tickets } from 'src/tickets';
import { Filters, Ticket } from 'src/components';
import cls from './styles.module.scss';

export const MainPage = () => {

  return (
    <div className={cls.mainPage}>
      <div className={cls.mainPage__wrapper}>
        <div className={cls.mainPage__filters}>
          <Filters />
        </div>
        <div className={cls.mainPage__tickets}>
          {tickets.map((ticket, index) => (
            <Ticket ticket={ticket} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
