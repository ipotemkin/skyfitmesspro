import { FC } from 'react'

import { User } from '../../components/User/User'
import { Header } from '../../components/Header/Header'
import { Progress } from '../../components/Progress/Progress'
import { Exercises } from '../../components/Exercises/Exercises'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'
import { mockCourses } from '../../data/course'

import styles from './style.module.css'

type WorkoutProps = {
  courseId: number
  day: number
}

export const Workout: FC<WorkoutProps> = ({ courseId, day }) => {
  const course = mockCourses[courseId]
  const { name: courseName, workouts } = course
  const workout = workouts[day - 1]
  const { exercises } = workout

  return (
    <div className={styles.container}>
      <Header children={<User />} />

      <main className={styles.main}>
        <h1 className={styles.heading}>{courseName}</h1>
        <h2 className={styles.title}>{workout.name}</h2>

        <VideoPlayer url={workout.videoUrl} />

        <div className={styles.exercises}>
          <Exercises exercises={exercises} />
          <Progress exercises={exercises} workoutId={workout.id} />
        </div>
      </main>
    </div>
  )
}
