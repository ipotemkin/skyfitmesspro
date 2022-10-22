import React, { FC, useEffect, useRef } from 'react'

import { WorkoutListItem } from './WorkoutListItem'

import styles from './style.module.css'
import { Workout } from '../../types'
import { Link } from 'react-router-dom'

type WorkoutListProps = {
  workouts: Workout[]
  courseId: number
}

export const WorkoutList: FC<WorkoutListProps> = ({ workouts, courseId }) => {
  const scrollContent = useRef<HTMLUListElement>(null)
  const scrollRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (
      scrollRef.current!.offsetHeight >= scrollContent.current!.scrollHeight
    ) {
      scrollRef.current!.style.overflowY = 'hidden'
    }
  }, [])

  return (
    <div className={styles.wrapper} ref={scrollRef}>
      <ul className={styles.list} ref={scrollContent}>
        {workouts.map((workout) => {
          return (
            <Link
              key={workout.id}
              className={styles.link}
              to={`/courses/${courseId + 1}/workouts/${workout.id}`}
              style={{ textDecoration: 'none' }}
            >
              {workout && workout.name && (
                <WorkoutListItem
                  key={workout.id}
                  done={workout.done || false}
                  title={workout.name && workout.name.split('/')[0]}
                  text={
                    workout.name.split('/')[1] &&
                    `${workout.name.split('/')[1]}/${
                      workout.name.split('/')[2]
                    }`
                  }
                />
              )}
            </Link>
          )
        })}
      </ul>
    </div>
  )
}
