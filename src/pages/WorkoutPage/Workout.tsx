import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { User } from '../../components/User/User'
import { Navigation } from '../../components/Navigation/Header'
import { Progress } from '../../components/Progress/Progress'
import { Exercises } from '../../components/Exercises/Exercises'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'
import { WarningPage } from '../WarningPage/WarningPage'
import { useUserCourse } from '../../hooks/userHooks'
import { useAppSelector } from '../../hooks/appHooks'
import { selectUser } from '../../slices/userSlice'

import styles from './style.module.css'

export const Workout: FC = () => {
  const { id, day } = useParams()
  const user = useAppSelector(selectUser)
  const { data, isLoading, isError } = useUserCourse(user?.uid, Number(id) - 1)

  console.log('Workout: user -->', user)  // for DEBUG!

  if (isLoading || user.isLoading || (!data && !isError))
    return <WarningPage text="Загрузка..." user={user} />

  if (!user.uid) return <WarningPage text="Вы не авторизованы!" />

  if (!data) {
    console.log('Вы не зарегистрированы на этот курс!')  // for DEBUG!
    return (
      <WarningPage text="Вы не зарегистрированы на этот курс!" user={user} />
    )
  }
  
  const workoutIdx = Number(day) - 1

  if (!data.workouts || (workoutIdx < 0 || workoutIdx >= data.workouts?.length))
    return (
      <WarningPage text="Нет такой тренировки на этом курсе!" user={user} />
    )

  const workout = data.workouts[workoutIdx]
  
  return (
    <div className={styles.container}>
      <Navigation children={<User user={user} />} />
      <main className={styles.main}>
        <h1 className={styles.heading}>{data.name}</h1>
        <h2 className={styles.title}>{workout.name}</h2>

        <VideoPlayer url={workout.videoUrl || ''} />

        {workout.exercises!.length > 0 && (
          <div className={styles.exercises}>
            <Exercises exercises={workout.exercises} />
            <Progress exercises={workout.exercises} workoutId={workout.id} />
          </div>
        )}
      </main>
    </div>
  )
}
