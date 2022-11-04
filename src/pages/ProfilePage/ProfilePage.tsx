import { FC, useState } from 'react'

import { Navigation } from '../../components/Navigation/Header'
import { User } from '../../components/User/User'
import { UserCourses } from '../../components/UserCourses/UserCourses'
import { UserInfo } from '../../components/UserInfo/UserInfo'
import { WorkoutModal } from '../../components/WorkoutModal/WorkoutModal'
import { useAppSelector } from '../../hooks/appHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { WarningPage } from '../WarningPage/WarningPage'

import styles from './style.module.css'

const ProfilePage: FC = () => {
  const currentUser = useAppSelector(selectCurrentUser)
  const [isWorkoutsShown, setIsWorkoutsShown] = useState(false)
  const [activeCourseId, setActiveCourseId] = useState<number>(1)

  const handleWorkouts = (courseId: number) => {
    setActiveCourseId(courseId)
    setIsWorkoutsShown(true)
  }

  if (!currentUser.idToken)
    return <WarningPage text="Пользователь в системе не зарегистрирован!" />

  return (
    <div className={styles.profilePage}>
      <div className={styles.wrapper}>
        <Navigation>
          <User user={currentUser} />
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

export default ProfilePage
