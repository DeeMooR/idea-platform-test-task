import React from 'react'
import cls from './styles.module.scss';

export const Loading = () => {
  return (
    <div className={cls.loading}>
      <div className={cls.loading__spinner} />
    </div>
  );
}
