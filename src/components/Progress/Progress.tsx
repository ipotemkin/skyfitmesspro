import { FC } from 'react'

import { Workout } from '../../types'
import classNames from 'classnames'

import styles from './style.module.css'

type ProgressProps = {
  exercises: Workout['exercises']
  workoutId: number
}

export const Progress: FC<ProgressProps> = ({ exercises, workoutId }) => {
  const percent = 45

  return (
    <div className={styles.progress}>
      <h2 className={styles.title}>Мой прогресс по тренировке {workoutId}:</h2>
      <ul className={styles.list}>
        {exercises?.map((exercise) => (
          <li key={exercise.id} className={styles.listItem}>
            <span className={styles.name}>{exercise.name}</span>
            <div
              className={classNames(
                styles.progressbar,
                styles[`colorBg${exercise.id}`]
              )}
            >
              <div
                className={classNames(
                  styles.done,
                  styles[`color${exercise.id}`]
                )}
                style={{ width: `${percent}%` }}
              ></div>
              <div
                className={styles.percent}
                style={{ left: `calc(${percent}% - 62px)` }}
              >
                {percent}%
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
