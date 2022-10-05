import React, { FC } from 'react'
import { cn } from '@bem-react/classname'

import { mockUserResponse } from '../../data/user'
import { Button } from '../Button/Button'

import './UserInfo.css'

const cnUserInfo = cn('UserInfo')

export const UserInfo: FC = () => (
  <div className={cnUserInfo()}>
    <h4 className={cnUserInfo('Title')}>Мой профиль</h4>
    <div className={cnUserInfo('InfoBlock')}>
      <p
        className={cnUserInfo('User')}
      >{`Логин: ${mockUserResponse.username}`}</p>
      <p
        className={cnUserInfo('User')}
      >{`Пароль: ${mockUserResponse.password}`}</p>
    </div>
    <div className={cnUserInfo('EditBlock')}>
      <Button buttonText="Редактировать логин" />
      <Button buttonText="Редактировать пароль" />
    </div>
  </div>
)
