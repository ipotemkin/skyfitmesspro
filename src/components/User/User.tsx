import classNames from 'classnames'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/userHooks'
import { FirebaseUser } from '../../types'
import { ReactComponent as Arrow } from './arrow-down.svg'

import styles from './style.module.css'

type Props = {
  user: FirebaseUser
}

export const User: FC<Props> = ({ user }) => {
  const [isShowNav, setIsShowNav] = useState(false)
  const { logOut } = useAuth()
  const navigate = useNavigate()

  const handleShowNav = () => {
    setIsShowNav((prev) => !prev)
  }

  const handleLogout = () => {
    logOut(() => {
      navigate('/')
    })
  }

  const handleProfile = () => {
    navigate('/profile')
  }

  return (
    <div className={styles.wrapper} onClick={handleShowNav}>
      <div className={styles.user}>
        <div className={styles.avatar} />
        <div className={styles.name}>{user.displayName || user.email}</div>
        <Arrow
          className={classNames(styles.arrow, isShowNav && styles.rotate)}
        />
      </div>

      {isShowNav && (
        <div className={styles.nav} onClick={(e) => e.stopPropagation()}>
          <div className={styles.link} onClick={handleProfile}>
            Профиль
          </div>
          <div className={styles.link} onClick={handleLogout}>
            Выйти
          </div>
        </div>
      )}
    </div>
  )
}
