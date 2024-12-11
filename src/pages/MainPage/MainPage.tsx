import React from 'react'
import { Filters, Ticket } from 'src/components';
import { useTickets } from 'src/context';
import cls from './styles.module.scss';

export const MainPage = () => {
  const { tickets, currency, rates } = useTickets();

  return (
    <div className={cls.mainPage}>
      <div className={cls.mainPage__wrapper}>
        <div className={cls.mainPage__filters}>
          <Filters />
        </div>
        <div className={cls.mainPage__tickets}>
          {tickets.map((ticket, index) => (
            <Ticket ticket={ticket} currency={currency} rates={rates} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
