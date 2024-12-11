import React, { useEffect } from 'react'
import { CURRENCIES, STOPS, selectSeveralStops, filterTickets } from './config';
import { useTickets } from 'src/context';
import cn from 'classnames';
import cls from './styles.module.scss';

export const Filters = () => {
  const { tickets, setShownTickets, currency, setCurrency, stops, setStops, setLoading } = useTickets();

  // задержка 500мс для имитации отправки запроса
  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      const filteredTickets = filterTickets(tickets, stops);
      setShownTickets(filteredTickets);
      setLoading(false);
    }, 500); 
    return () => clearTimeout(timeoutId);
  }, [tickets, stops])

  const handleClickLine = (item: string) => {
    const updatedStops = selectSeveralStops(stops, item);
    setStops(updatedStops);
  }

  const handleClickOnly = (item: string) => {
    setStops([item]);
  }

  return (
    <aside className={cls.filters}>
      <p className={cls.filters__subtitle}>Валюта</p>
      <div className={cls.filters__currencies}>
        {CURRENCIES.map(item => (
          <div 
            className={cn(cls.filters__currency, {
              [cls.isActive]: item === currency,
            })}
            onClick={() => setCurrency(item)}
            key={item}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
      <p className={cls.filters__subtitle}>Количество пересадок</p>
      <div className={cls.filters__stops}>
        {STOPS.map(item => (
          <div className={cls.filters__stop} key={item}>
            <label className={cls.stop__label}>
              <input type='checkbox' name='stop' checked={stops.includes(item)} onClick={() => handleClickLine(item)} />
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" width="18" height="18">
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" fill='#2196f3' transform="translate(6, 5)"/>
                </svg>
              </span>
              {item}
            </label>
            <p className={cls.stop__btnOnly} onClick={() => handleClickOnly(item)}>Только</p>
          </div>
        ))}
      </div>
    </aside>
  )
}
