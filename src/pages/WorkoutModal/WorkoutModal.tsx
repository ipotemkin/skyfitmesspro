import { FC } from 'react'
import { WorkoutList } from '../../components/WorkoutList/WorkoutList'
import { Workout } from '../../types'

import styles from './style.module.css'

type WorkoutModalProps = {
  // setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
  workouts: Workout[]
  setIsOpened: Function
}

export const WorkoutModal: FC<WorkoutModalProps> = ({ workouts, setIsOpened }) => {
  return (
    <div className={styles.modal} onClick={() => setIsOpened(false)}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Выберите тренировку</h2>
        <WorkoutList workouts={workouts}/>
      </div>
    </div>
  )
}
