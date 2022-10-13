import { FC } from 'react'

import { Navigation } from '../../components/Navigation/Header'
import { selectUser } from '../../slices/userSlice'
import { useAppSelector } from '../../hooks/appHooks'
import { User as UserNav } from '../../components/User/User'
import { UserCourses } from '../../components/UserCourses/UserCourses'
import { UserInfo } from '../../components/UserInfo/UserInfo'

import styles from './style.module.css'

export const ProfilePage: FC = () => {
  const currentUser = useAppSelector(selectUser)

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
