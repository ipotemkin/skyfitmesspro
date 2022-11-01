import { FC, useState } from 'react'

import { FirebaseUserRESTAPI } from '../../types'
import { Button } from '../Button/Button'
import { EmailModal } from '../ProfileModal/EmailModal'
import { PasswordModal } from '../ProfileModal/PasswordModal'

import styles from './style.module.css'

type Props = {
  user: FirebaseUserRESTAPI
}

export const UserInfo: FC<Props> = ({ user }) => {
  const [isModalEmailShown, setIsModalEmailShown] = useState(false)
  const [isModalPasswordShown, setIsModalPasswordShown] = useState(false)

  const handleEmailClick = () => {
    setIsModalEmailShown(true)
  }

  const handlePasswordClick = () => {
    setIsModalPasswordShown(true)
  }

  return (
    <div className={styles.userInfo}>
      <h4 className={styles.title}>Мой профиль</h4>
      <div className={styles.infoBlock}>
        <p className={styles.user}>
          {`Логин: ${user.displayName || user.email}`}
        </p>
      </div>
      <div className={styles.editBlock} data-cy="edit-data-user">
        <Button onClick={handleEmailClick}>Редактировать e-mail</Button>
        <Button onClick={handlePasswordClick}>Редактировать пароль</Button>
      </div>

      {isModalEmailShown && <EmailModal setIsOpened={setIsModalEmailShown} />}
      {isModalPasswordShown && (
        <PasswordModal setIsOpened={setIsModalPasswordShown} />
      )}
    </div>
  )
}
