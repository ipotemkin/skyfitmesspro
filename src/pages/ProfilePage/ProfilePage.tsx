import { FC, useState } from 'react'

import { Navigation } from '../../components/Navigation/Header'
import { selectUser } from '../../slices/userSlice'
import { useAppSelector } from '../../hooks/appHooks'
import { User as UserNav } from '../../components/User/User'
import { UserCourses } from '../../components/UserCourses/UserCourses'
import { UserInfo } from '../../components/UserInfo/UserInfo'
import { WorkoutModal } from '../../components/WorkoutModal/WorkoutModal'
import { WarningPage } from '../WarningPage/WarningPage'

import styles from './style.module.css'

export const ProfilePage: FC = () => {
  const currentUser = useAppSelector(selectUser)
  const [isWorkoutsShown, setIsWorkoutsShown] = useState(false)
  const [activeCourseId, setActiveCourseId] = useState<number>(1)

  const handleWorkouts = (courseId: number) => {
    setActiveCourseId(courseId)
    setIsWorkoutsShown(true)
  }

  if (currentUser.isLoading) return <WarningPage text="Загрузка..." />

  if (!currentUser.uid && !currentUser.isLoading)
    return <WarningPage text="Пользователь в системе не зарегистрирован!" />

  return (
    <div className={styles.profilePage}>
      <div className={styles.wrapper}>
        <Navigation>
          <UserNav user={currentUser} />
        </Navigation>
        <UserInfo user={currentUser} />
        <UserCourses user={currentUser} handleWorkouts={handleWorkouts} />
      </div>
      {isWorkoutsShown && (
        <WorkoutModal
          setIsOpened={setIsWorkoutsShown}
          courseId={activeCourseId}
        />
      )}
    </div>
  )
}
