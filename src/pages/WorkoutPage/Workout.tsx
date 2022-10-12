import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { User } from '../../components/User/User'
import { Navigation } from '../../components/Navigation/Header'
import { Progress } from '../../components/Progress/Progress'
import { Exercises } from '../../components/Exercises/Exercises'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'
import { useUserCourse } from '../../hooks/userHooks'
import { useAppSelector } from '../../hooks/appHooks'
import { selectUser } from '../../slices/userSlice'

import styles from './style.module.css'

export const Workout: FC = () => {
  const { id, day } = useParams()  
  const user = useAppSelector(selectUser)

  const courseId = Number(id) || 0
  const courseDay = Number(day) || 0

  const { userCourse, isLoading } = useUserCourse(user?.uid, courseId)
  
  if (isLoading) return <h2>Загрузка...</h2> 
  
  if (!user) return <h2>Пользоваль не зашел на сайт</h2>
  
  if (!userCourse) return <h2>Нет такого курса у текущего пользователя</h2>

  const workout = userCourse.workouts![courseDay-1]
  
  return (
    <div className={styles.container}>
      <Navigation children={<User user={user}/>} />

      <main className={styles.main}>
        <h1 className={styles.heading}>{userCourse.name}</h1>
        <h2 className={styles.title}>{workout.name}</h2>

        <VideoPlayer url={workout?.videoUrl || ''} />

        {workout.exercises!.length > 0 && (
          <div className={styles.exercises}>
            <Exercises exercises={workout.exercises} />
            <Progress
              exercises={workout.exercises}
              workoutId={workout.id} />
          </div>
        )}
      </main>
    </div>
  )
}
