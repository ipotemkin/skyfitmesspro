import { FC } from 'react'
import { Modal } from '../Modal/Modal'
import { useAppSelector } from '../../hooks/appHooks'
import { useUserCourse } from '../../hooks/userHooks'
import { WorkoutList } from '../WorkoutList/WorkoutList'
import { selectCurrentUser } from '../../slices/currentUserSlice'

import styles from './style.module.css'

type WorkoutModalProps = {
  courseId: number
  setIsOpened: Function
}

export const WorkoutModal: FC<WorkoutModalProps> = ({
  setIsOpened,
  courseId,
}) => {
  const user = useAppSelector(selectCurrentUser)
  const { data } = useUserCourse(user.localId || null, courseId)

  return (
    <Modal isOpen={() => setIsOpened(false)}>
      <div className={styles.content}>
        <h2 className={styles.title}>Выберите тренировку</h2>
        {data && data.workouts && (
          <WorkoutList workouts={data.workouts} courseId={courseId} />
        )}
      </div>
    </Modal>
  )
}
