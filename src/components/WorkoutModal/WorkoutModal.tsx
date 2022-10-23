import { FC } from 'react'
import { Modal } from '../Modal/Modal'
import { selectUser } from '../../slices/userSlice'
import { useAppSelector } from '../../hooks/appHooks'
import { useUserCourse } from '../../hooks/userHooks'
import { WorkoutList } from '../WorkoutList/WorkoutList'

import styles from './style.module.css'

type WorkoutModalProps = {
  courseId: number
  setIsOpened: Function
}

export const WorkoutModal: FC<WorkoutModalProps> = ({
  setIsOpened,
  courseId,
}) => {
  const user = useAppSelector(selectUser)
  const { data } = useUserCourse(user.uid, courseId)

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
