import React, { FC, useEffect, useState } from 'react'
import { crossIcon } from 'src/assets'
import { NotificationData } from './config';
import cn from 'classnames';
import cls from './styles.module.scss';

interface INotification {
  type: 'error' | 'success',
  message: string,
  close: () => void,
}

export const Notification:FC<INotification> = ({type, message, close}) => {
  const [isVisible, setIsVisible] = useState(true);
  const { icon, style } = NotificationData[type];

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(closeModal, 2500);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    if (close) close();
  }

  return isVisible ? (
    <div className={cn(cls.notification, cls[style])}>
      <div className={cls.notification__wrapper}>
        <div className={cls.notification__icon}>{icon}</div>
        <p className={cls.notification__text}>{message}</p>
        <button className={cls.notification__cross} onClick={close}>
          <img src={crossIcon} alt="close" />
        </button>
      </div>
    </div>
  ): null;
}
