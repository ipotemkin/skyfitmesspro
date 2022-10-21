import React, { FC, useRef } from 'react'

import { WorkoutListItem } from './WorkoutListItem'

import styles from './style.module.css'
import { Workout } from '../../types'
import { Link } from 'react-router-dom'
import { formatString } from '../../utils'
import { ROUTES } from '../../routes'

type WorkoutListProps = {
  workouts: Workout[]
  courseId: number
}

export const WorkoutList: FC<WorkoutListProps> = ({ workouts, courseId }) => {
  const scrollRef = useRef<HTMLInputElement>(null)
  const scrollContent = useRef<HTMLUListElement>(null)

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const total =
      scrollContent.current!.scrollHeight - scrollContent.current!.offsetHeight
    const percentage = total * (Number(value) / 100)
    scrollContent.current!.scrollTop = percentage
  }

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list} ref={scrollContent}>
        {workouts.map((workout) => {
          return (
            <Link
              key={workout.id}
              className={styles.link}
              to={formatString(ROUTES.workout, [`${courseId + 1}`, `${workout.id}`])}
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

      <div className={styles.scrollbar}>
        <input
          ref={scrollRef}
          className={styles.scrollbarInput}
          type="range"
          onChange={changeHandler}
          defaultValue={0}
        />
      </div>
    </div>
  )
}
