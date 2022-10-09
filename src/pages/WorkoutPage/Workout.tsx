import { FC, useEffect, useState } from 'react'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { useParams } from 'react-router-dom'

import auth from '../../db/auth'
import { User } from '../../components/User/User'
import { Navigation } from '../../components/Navigation/Header'
import { Progress } from '../../components/Progress/Progress'
import { Exercises } from '../../components/Exercises/Exercises'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'
import { useUserCourse } from '../../hooks/userHooks'

import styles from './style.module.css'

export const Workout: FC = () => {
  const { id, day } = useParams()
  const [user, setUser] = useState<FirebaseUser>()

  const courseId = Number(id) || 0
  const courseDay = Number(day) || 0

  const userCourse = useUserCourse(user?.uid || '', courseId)

  useEffect(() => {
    const listener = onAuthStateChanged(auth, async (user) => {
      if (user) setUser(user)
      else setUser(undefined)

    })
    
    return () => {
      listener()
    }
  }, [])  
  
  
  if (!user) return <h2>Пользоваль не зашел в программу</h2>
  
  if (!userCourse) return <h2>Нет такого курса у текущего пользователя</h2>

  return (
    <div className={styles.container}>
      <Navigation children={<User user={user}/>} />

      <main className={styles.main}>
        <h1 className={styles.heading}>{userCourse.name}</h1>
        <h2 className={styles.title}>{userCourse.workouts![courseDay-1].name}</h2>

        <VideoPlayer url={userCourse.workouts![courseDay-1].videoUrl || ''} />

        {userCourse.workouts![courseDay-1].exercises!.length > 0 && (
          <div className={styles.exercises}>
            <Exercises exercises={userCourse.workouts![courseDay-1].exercises} />
            <Progress
              exercises={userCourse.workouts![courseDay-1].exercises}
              workoutId={userCourse.workouts![courseDay-1].id} />
          </div>
        )}
      </main>
    </div>
  )
}
