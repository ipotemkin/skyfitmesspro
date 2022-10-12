import { FC, useState } from 'react'
import { User as FirebaseUser } from 'firebase/auth'

import { ReactComponent as Arrow } from './arrow-down.svg'

import styles from './style.module.css'

type Props = {
  user: FirebaseUser
}

export const User: FC<Props> = ({ user }) => {
  const [isShowNav, setIsShowNav] = useState(false)

  const handleShowNav = () => {
    setIsShowNav((prev) => !prev)
  }

  return (
    <div className={styles.wrapper} onClick={handleShowNav}>
      <div className={styles.user}>
        <div className={styles.avatar} />
        <div className={styles.name}>{user.displayName || user.email}</div>
        <Arrow />
      </div>
      {isShowNav && (
        <div className={styles.nav}>
          <div className={styles.link}>Профиль</div>
          <div className={styles.link}>Выйти</div>
        </div>
      )}
    </div>
  )
}
