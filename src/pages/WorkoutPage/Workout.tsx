import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { User } from '../../components/User/User'
import { Navigation } from '../../components/Navigation/Header'
import { Progress } from '../../components/Progress/Progress'
import { Exercises } from '../../components/Exercises/Exercises'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'
import { mockCourses } from '../../data/course'

import styles from './style.module.css'

export const Workout: FC = () => {
  const { id, day } = useParams()

  const courseId = Number(id) || 0
  const courseDay = Number(day) || 0

  const course = mockCourses[courseId]
  const { name: courseName, workouts } = course
  const workout = workouts[courseDay - 1]
  const { exercises } = workout

  return (
    <div className={styles.container}>
      <Navigation children={<User />} />

      <main className={styles.main}>
        <h1 className={styles.heading}>{courseName}</h1>
        <h2 className={styles.title}>{workout.name}</h2>

        <VideoPlayer url={workout.videoUrl} />

        {exercises.length > 0 && (
          <div className={styles.exercises}>
            <Exercises exercises={exercises} />
            <Progress exercises={exercises} workoutId={workout.id} />
          </div>
        )}
      </main>
    </div>
  )
}
