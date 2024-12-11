import React, { useState } from 'react'
import { planeIcon, turkishAirlinesLogo } from 'src/assets';
import { formatDate, getPrice, getTextPluralStops } from './config';
import { CurrencyType, IRates, ITicket } from 'src/interfaces';
import { Notification } from 'src/components';
import cls from './styles.module.scss';

type Props = {
  ticket: ITicket;
  currency: CurrencyType;
  rates: IRates | null;
}

export const Ticket = ({ticket, currency, rates}: Props) => {
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

  const [addedToBasket, setAddedToBasket] = useState(false);
  const actualPrice = getPrice(rates, currency, price);

  return (
    <section className={cls.ticket}>
      <div className={cls.ticket__left}>
        <div className={cls.ticket__airline}>
          <img src={turkishAirlinesLogo} alt="Turkish Airlines" />
        </div>
        <button className={cls.ticket__buyBtn} onClick={() => setAddedToBasket(true)}>
          Купить <br/> за {actualPrice}
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
      {addedToBasket &&
        <Notification 
          type='success' 
          message='Билет добавлен в корзину' 
          close={() => setAddedToBasket(false)} 
        />
      }
    </section>
  )
}
