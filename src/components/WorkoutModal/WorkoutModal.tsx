import { FC } from 'react'
import { Modal } from '../Modal/Modal'
import { useUserCourse } from '../../hooks/userCourseHooks'
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
  const { data } = useUserCourse(courseId)

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
