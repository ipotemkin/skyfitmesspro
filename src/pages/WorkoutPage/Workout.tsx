import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'

import { WorkoutArg } from '../../api/users.api'
import { Exercises } from '../../components/Exercises/Exercises'
import { Navigation } from '../../components/Navigation/Header'
import { Progress } from '../../components/Progress/Progress'
import { ProgressModal } from '../../components/ProgressModal/ProgressModal'
import { SuccessModal } from '../../components/SuccessModal/SuccessModal'
import { User } from '../../components/User/User'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'
import { useAppSelector } from '../../hooks/appHooks'
import { useUserCourse } from '../../hooks/userHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { WarningPage } from '../WarningPage/WarningPage'

import styles from './style.module.css'

export const Workout: FC = () => {
  const { id, day } = useParams()
  const courseId = Number(id) - 1
  const user = useAppSelector(selectCurrentUser)
  const [isModalOneShown, setIsModalOneShown] = useState(false)
  const [isModalTwoShown, setIsModalTwoShown] = useState(false)
  const { data, isLoading, isError } = useUserCourse(user?.localId || null, courseId)

  console.log('Workout: user -->', user) // for DEBUG!

  if (isLoading || (!data && !isError))
    return <WarningPage text="Загрузка..." user={user} />

  if (!user.localId) return <WarningPage text="Вы не авторизованы!" />

  if (!data) {
    console.log('Вы не зарегистрированы на этот курс!') // for DEBUG!
    return (
      <WarningPage text="Вы не зарегистрированы на этот курс!" user={user} />
    )
  }

  const workoutIdx = Number(day) - 1

  if (!data.workouts || workoutIdx < 0 || workoutIdx >= data.workouts?.length)
    return (
      <WarningPage text="Нет такой тренировки на этом курсе!" user={user} />
    )

  const handleClick = () => {
    setIsModalOneShown(true)
  }

  const handleSendClick = () => {
    setIsModalOneShown(false)
    setIsModalTwoShown(true)
  }

  const workout = data.workouts[workoutIdx]
  console.log('workout -->', workout)

  const workoutArg: WorkoutArg = {
    uid: user.localId,
    courseId,
    workoutId: workoutIdx
  }

  return (
    <div className={styles.container}>
      <Navigation children={<User user={user} />} />
      <main className={styles.main}>
        <h1 className={styles.heading}>{data.name}</h1>
        <h2 className={styles.title}>{workout.name}</h2>

        <VideoPlayer url={workout.videoUrl || ''} />

        {workout.exercises && workout.exercises.length > 0 && (
          <div className={styles.exercises}>
            <Exercises exercises={workout.exercises} onClick={handleClick} />
            <Progress exercises={workout.exercises} workoutId={workout.id} />
          </div>
        )}
      </main>
      {isModalOneShown && (
        <ProgressModal
          setIsOpened={setIsModalOneShown}
          workoutArg={workoutArg}
          exercises={workout.exercises}
          onClick={handleSendClick}
        />
      )}
      {isModalTwoShown && (
        <SuccessModal
          setIsOpened={setIsModalTwoShown}
          text="Ваш прогресс
          засчитан!"
        />
      )}
    </div>
  )
}
