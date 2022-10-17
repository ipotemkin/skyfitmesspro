import { FC } from 'react'

import { mockUserWorkouts } from '../../data/course'
import { WorkoutListItem } from './WorkoutListItem'

import styles from './style.module.css'
import { Workout } from '../../types'

type WorkoutListProps = {
  // courseId?: number
  workouts: Workout[]
}

export const WorkoutList: FC<WorkoutListProps> = ({ workouts }) => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {workouts.map((workout) => (
          workout && workout.name && <WorkoutListItem
            key={workout.id}
            done={workout.done || false}
            title={workout.name.split('/')[0]}
            text={`${workout.name.split('/')[1]}/${workout.name.split('/')[2]}`}
          />
        ))}
      </ul>

      <div className={styles.scrollbar}>
        <input
          className={styles.scrollbarInput}
          type="range"
          min={1}
          max={mockUserWorkouts.length}
        />
      </div>
    </div>
  )
}
