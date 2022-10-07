import { FC } from 'react'

import { Exercises } from '../../components/Exercises/Exercises'
import { Logo } from '../../components/Logo/Logo'
import { Progress } from '../../components/Progress/Progress'
import { mockCourses } from '../../data/course'
import { mockUserResponse } from '../../data/user'
import { ReactComponent as Arrow } from './arrow-down.svg'

import styles from './style.module.css'

type WorkoutProps = {
  courseId: number
  day: number
}

export const Workout: FC<WorkoutProps> = ({ courseId, day }) => {
  const course = mockCourses[courseId]
  const { name: courseName, workouts } = course
  const workout = workouts[day]
  const { exercises } = workout

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Logo />
          <div className={styles.navUser}>
            <div className={styles.navUserAvatar} />
            <div className={styles.navUserName}>
              {mockUserResponse.username}
            </div>
            <Arrow />
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <h1 className={styles.heading}>{courseName}</h1>
        <h2 className={styles.title}>{workout.name}</h2>

        <div style={{ height: '640px', border: '1px solid' }}>
          тут будет плеер
        </div>

        <div className={styles.exercises}>
          <Exercises exercises={exercises} />
          <Progress exercises={exercises} workoutId={workout.id} />
        </div>
      </main>
    </div>
  )
}
