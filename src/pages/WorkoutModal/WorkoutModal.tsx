import { FC } from 'react'
import { WorkoutList } from '../../components/WorkoutList/WorkoutList'

import styles from './style.module.css'

type WorkoutModalProps = {
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const WorkoutModal: FC<WorkoutModalProps> = ({ setIsOpened }) => {
  return (
    <div className={styles.layout} onClick={() => setIsOpened(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Выберите тренировку</h2>
        <WorkoutList />
      </div>
    </div>
  )
}
