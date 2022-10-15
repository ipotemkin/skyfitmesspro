import { FC, useState } from 'react'

import { Navigation } from '../../components/Navigation/Header'
import { selectUser } from '../../slices/userSlice'
import { useAppSelector } from '../../hooks/appHooks'
import { User as UserNav } from '../../components/User/User'
import { UserCourses } from '../../components/UserCourses/UserCourses'
import { UserInfo } from '../../components/UserInfo/UserInfo'

import styles from './style.module.css'
import { WorkoutModal } from '../WorkoutModal/WorkoutModal'

export const ProfilePage: FC = () => {
  const currentUser = useAppSelector(selectUser)
  const [isWorkoutsShown, setIsWorkoutsShown] = useState(false)

  const handleWorkouts = () => {
    setIsWorkoutsShown(true)
  }

  if (!currentUser) return <h2>Пользователь в системе не зарегистирован</h2>

  return (
    <>
    {isWorkoutsShown && <WorkoutModal />}
    
    <div className={styles.profilePage}>
        
        <div className={styles.wrapper}>
          <Navigation>
            <UserNav user={currentUser} />
          </Navigation>
          <UserInfo user={currentUser} />
          <UserCourses user={currentUser} handleWorkouts={handleWorkouts}/>
        </div>
      </div>
    </>    
  )
}
