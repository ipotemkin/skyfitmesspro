import classNames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/appHooks'
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
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  const handleShowNav = () => {
    setIsShowNav(!isShowNav)
  }

  const handleLogout = () => {
    dispatch(deleteCurrentUser())
  }

  const handleProfile = () => {
    navigate(ROUTES.profile)
  }

  const handleCourses = () => {
    navigate(ROUTES.admin)
  }

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!outerRef.current || !outerRef.current.contains(e.target as Node)) {
        setIsShowNav(false)
      }
    }
    document.addEventListener('click', listener)
    return () => document.removeEventListener('click', listener)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.user} onClick={handleShowNav} ref={outerRef}>
        <div className={styles.avatar}>
          {user.displayName?.trim().charAt(0).toUpperCase() ||
            user.email?.trim().charAt(0).toUpperCase()}
        </div>
        <div data-cy="name-user" className={styles.name}>{user.displayName || user.email}</div>
        <Arrow
          className={classNames(styles.arrow, isShowNav && styles.rotate)}
        />
      </div>

      {isShowNav && (
        <div
          className={styles.nav}
          ref={innerRef}
          onClick={(e) => e.stopPropagation()}
        >
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
