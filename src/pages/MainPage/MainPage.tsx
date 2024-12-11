import React from 'react'
import { Filters, Loading, Ticket } from 'src/components';
import { useTickets } from 'src/context';
import cls from './styles.module.scss';

export const MainPage = () => {
  const { shownTickets, currency, rates, loading } = useTickets();

  return (
    <div className={cls.mainPage}>
      <div className={cls.mainPage__wrapper}>
        <div className={cls.mainPage__filters}>
          <Filters />
        </div>
        <div className={cls.mainPage__tickets}>
          {loading ? (
            <Loading />
          ) : (
            !!shownTickets.length ? (
              shownTickets.map((ticket, index) => (
                <Ticket ticket={ticket} currency={currency} rates={rates} key={index} />
              ))
            ) : (
              <p className={cls.mainPage__empty}>Билетов по выбранным критериям нет</p>
            )
          )}
        </div>
      </div>
    </div>
  )
}
