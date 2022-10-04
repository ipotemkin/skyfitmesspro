import React, { FC } from 'react';
import { cn } from '@bem-react/classname';

import { Button } from '../Button/Button';

import './UserInfo.css'
import { mockUserResponse } from '../../data/user';

const cnUserInfo = cn('UserInfo');

export const UserInfo:FC = () => {
  return (
    <div className={cnUserInfo()}>
      <h4 className={cnUserInfo('Title')}>Мой профиль</h4>
      <div className={cnUserInfo('InfoBlock')}>
        <p className={cnUserInfo('User')}>{`Логин: ${mockUserResponse.username}`}</p>
        <p className={cnUserInfo('User')}>{`Пароль: ${mockUserResponse.password}`}</p>
      </div>
      <div className={cnUserInfo('EditBlock')}>
        <Button buttonText="Редактировать логин" />
        <Button buttonText="Редактировать пароль" />
      </div>
    </div>
  );
};
