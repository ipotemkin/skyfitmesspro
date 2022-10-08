import { WorkoutList } from '../../components/WorkoutList/WorkoutList'

import styles from './style.module.css'

export const WorkoutModal = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.background}></div>
      <div className={styles.modal}>
        <h2 className={styles.title}>Выберите тренировку</h2>
        <WorkoutList />
      </div>
    </div>
  )
}
