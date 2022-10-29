import { FC, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '../../routes'
import { Workout } from '../../types'
import { formatString } from '../../utils'
import { WorkoutListItem } from './WorkoutListItem'

import styles from './style.module.css'

type WorkoutListProps = {
  workouts: Workout[]
  courseId: number
  setIsOpened: Function
}

export const WorkoutList: FC<WorkoutListProps> = ({ workouts, courseId, setIsOpened }) => {
  const scrollContent = useRef<HTMLUListElement>(null)
  const scrollRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (
      scrollRef.current!.offsetHeight >= scrollContent.current!.scrollHeight
    ) {
      scrollRef.current!.style.overflowY = 'hidden'
    }
  }, [])

  const handleLink = () => {
    setIsOpened(false)
  }

  return (
    <div className={styles.wrapper} ref={scrollRef}>
      <ul className={styles.list} ref={scrollContent}>
        {workouts.map((workout) => {
          return (
            <Link
              key={workout.id}
              className={styles.link}
              to={formatString(ROUTES.workout, [`${courseId + 1}`, `${workout.id}`])}
              style={{ textDecoration: 'none' }}
              onClick={handleLink}
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
