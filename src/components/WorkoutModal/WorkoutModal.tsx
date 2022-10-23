import { FC } from 'react'
import { WorkoutList } from '../WorkoutList/WorkoutList'
import { useAppSelector } from '../../hooks/appHooks'
import { useUserCourse } from '../../hooks/userHooks'
import { selectUser } from '../../slices/userSlice'

import styles from './style.module.css'

type WorkoutModalProps = {
  setIsOpened: Function
  courseId: number
}

export const WorkoutModal: FC<WorkoutModalProps> = ({
  setIsOpened,
  courseId,
}) => {
  const user = useAppSelector(selectUser)
  const { data } = useUserCourse(user.uid, courseId)

  return (
    <div className={styles.modal} onClick={() => setIsOpened(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Выберите тренировку</h2>
        {data && data.workouts && (
          <WorkoutList workouts={data.workouts} courseId={courseId} />
        )}
      </div>
    </div>
  )
}
