import classNames from 'classnames'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppCookies } from '../../hooks/appHooks'
import { ROUTES } from '../../routes'
import { deleteCurrentUser } from '../../slices/currentUserSlice'
import { FirebaseUserRESTAPI } from '../../types'
import { ReactComponent as Arrow } from './arrow-down.svg'

import styles from './style.module.css'

type Props = {
  user: FirebaseUserRESTAPI
}

export const User: FC<Props> = ({ user }) => {
  const [isShowNav, setIsShowNav] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { removeCookies } = useAppCookies()

  const handleShowNav = () => {
    setIsShowNav((prev) => !prev)
  }

  const handleLogout = () => {
    dispatch(deleteCurrentUser())
    removeCookies()
  }

  const handleProfile = () => {
    navigate(ROUTES.profile)
  }

  const handleCourses = () => {
    navigate(ROUTES.admin)
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
          <div className={styles.link} onClick={handleCourses}>
            Добавить/удалить курс
          </div>
          <div className={styles.link} onClick={handleLogout}>
            Выйти
          </div>
        </div>
      )}
    </div>
  )
}
