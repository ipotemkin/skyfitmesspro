import { FC } from 'react'

import { Exercise } from '../../types'
import classNames from 'classnames'

import styles from './style.module.css'

type ProgressProps = {
  exercises: Exercise[]
  workoutId: number
}

export const Progress: FC<ProgressProps> = ({ exercises, workoutId }) => {
  const title = `Мой прогресс по тренировке ${workoutId}:`

  return (
    <div className={styles.progress} data-cy="progress-bars">
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {exercises?.map((exercise) => {
          const percent = Math.round(
            ((exercise.userProgress || 0) / exercise.retriesCount) * 100
          )

          return (
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
                <div className={styles.percent}>{percent}%</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
