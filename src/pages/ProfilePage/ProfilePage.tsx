import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged, User } from 'firebase/auth'

import auth from '../../db/auth'
import { UserInfo } from '../../components/UserInfo/UserInfo'
import { UserCourses } from '../../components/UserCourses/UserCourses'

import styles from './style.module.css'
import { User as UserNav } from '../../components/User/User'
import { Navigation } from '../../components/Navigation/Header'

export const ProfilePage: FC = () => {
  const [currentUser, setCurrentUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)
        setIsLoading(false)
      } else {
        setCurrentUser(undefined)
        setIsLoading(false)
      }
    })

    return () => {
      listener()
    }
  }, [])

  if (isLoading) return <h2>Загрузка...</h2>

  if (!currentUser) return <h2>Пользователь в системе не зарегистирован</h2>

  return (
    <div className={styles.profilePage}>
      <div className={styles.wrapper}>
        <Navigation>
        <UserNav user={currentUser} />
        </Navigation>
        <UserInfo user={currentUser} />
        <UserCourses user={currentUser} />
      </div>
    </div>
  )
}
