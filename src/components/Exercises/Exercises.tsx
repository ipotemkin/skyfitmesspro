import { FC } from 'react'

import { Workout } from '../../types'
import { Button } from '../Button/Button'

import styles from './style.module.css'

type ExercisesProps = {
  exercises: Workout['exercises']
  onClick?: VoidFunction
}

export const Exercises: FC<ExercisesProps> = ({ exercises, onClick }) => {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Упражнения</h2>
      <ul className={styles.list}>
        {exercises?.map((exercise) => (
          <li key={exercise.id} className={styles.listItem}>
            <span>{exercise.name} </span>
            <span>({exercise.retriesCount}&nbsp;повторений)</span>
          </li>
        ))}
      </ul>
      <Button onClick={onClick}>Заполнить свой прогресс</Button>
    </div>
  )
}
