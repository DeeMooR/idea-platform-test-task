import React from 'react'
import { ITicket } from 'src/interfaces';
import cls from './styles.module.scss';
import { planeIcon, turkishAirlinesLogo } from 'src/assets';
import { formatCost, formatDate, getTextPluralStops } from './config';

type Props = {
  ticket: ITicket;
}

export const Ticket = ({ticket}: Props) => {
  const {
    origin, 
    origin_name, 
    destination, 
    destination_name, 
    departure_date, 
    departure_time, 
    arrival_date, 
    arrival_time, 
    carrier, 
    price, 
    stops 
  } = ticket;

  return (
    <section className={cls.ticket}>
      <div className={cls.ticket__left}>
        <div className={cls.ticket__airline}>
          <img src={turkishAirlinesLogo} alt="Turkish Airlines" />
        </div>
        <button className={cls.ticket__buyBtn}>
          Купить <br/> за {formatCost(price)}₽
        </button>
      </div>
      <div className={cls.ticket__right}>
        <div className={cls.ticket__timeBlock}>
          <time className={cls.ticket__time}>{departure_time}</time>
          <div className={cls.ticket__flight}>
            <p className={cls.ticket__stops}>{getTextPluralStops(stops)}</p>
            <div className={cls.ticket__planeLine}>
              <hr />
              <img src={planeIcon} alt="plane" />
            </div>
          </div>
          <time className={cls.ticket__time}>{arrival_time}</time>
        </div>
        <div className={cls.ticket__airports}>
          <div className={cls.ticket__airport}>
            <p className={cls.ticket__city}>{origin}, {origin_name}</p>
            <p className={cls.ticket__date}>{formatDate(departure_date)}</p>
          </div>
          <div className={cls.ticket__airport}>
            <p className={cls.ticket__city}>{destination_name}, {destination}</p>
            <p className={cls.ticket__date}>{formatDate(arrival_date)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
