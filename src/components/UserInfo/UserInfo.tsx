import { FC } from 'react'
import { User } from 'firebase/auth'

import { Button } from '../Button/Button'

import styles from './style.module.css'

type Props = {
  user: User
}

export const UserInfo: FC<Props> = ({ user }) => {
  return (
    <div className={styles.userInfo}>
      <h4 className={styles.title}>Мой профиль</h4>
      <div className={styles.infoBlock}>
        <p className={styles.user}>
          {`Логин: ${user.displayName || user.email }`}
        </p>
      </div>
      <div className={styles.editBlock}>
        <Button>Редактировать логин</Button>
        <Button>Редактировать пароль</Button>
      </div>
    </div>
  )
}
