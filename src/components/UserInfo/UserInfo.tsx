import { FC } from 'react'

import { mockUserResponse } from '../../data/user'
import { Button } from '../Button/Button'

import styles from './style.module.css'

export const UserInfo: FC = () => (
  <div className={styles.userInfo}>
    <h4 className={styles.title}>Мой профиль</h4>
    <div className={styles.infoBlock}>
      <p className={styles.user}>{`Логин: ${mockUserResponse.username}`}</p>
    </div>
    <div className={styles.editBlock}>
      <Button>Редактировать логин</Button>
      <Button>Редактировать пароль</Button>
    </div>
  </div>
)
