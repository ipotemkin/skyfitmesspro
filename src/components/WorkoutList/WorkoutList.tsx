import { FC } from 'react'

import { mockUserWorkouts } from '../../data/course'
import { WorkoutListItem } from './WorkoutListItem'

import styles from './style.module.css'
import { Workout } from '../../types'
import { Link } from 'react-router-dom'

type WorkoutListProps = {
  // courseId?: number
  workouts: Workout[]
  courseId: number
}

export const WorkoutList: FC<WorkoutListProps> = ({ workouts, courseId }) => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {workouts.map((workout) => {
          return (
            <Link
              to={`/courses/${courseId + 1}/workouts/${workout.id}`}
              style={{ textDecoration: 'none' }}
            >
            {workout && workout.name && <WorkoutListItem
              key={workout.id}
              done={workout.done || false}
              title={workout.name.split('/')[0]}
              text={`${workout.name.split('/')[1]}/${workout.name.split('/')[2]}`}
            />}
            </Link>
          )
        }
        )}
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
