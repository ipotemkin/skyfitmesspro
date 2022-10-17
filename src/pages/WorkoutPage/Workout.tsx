import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'

import { User } from '../../components/User/User'
import { Navigation } from '../../components/Navigation/Header'
import { Progress } from '../../components/Progress/Progress'
import { Exercises } from '../../components/Exercises/Exercises'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'
import { ProgressModal } from '../../components/ProgressModal/ProgressModal'
import { WarningPage } from '../WarningPage/WarningPage'
import { useUserCourse } from '../../hooks/userHooks'
import { useAppSelector } from '../../hooks/appHooks'
import { selectUser } from '../../slices/userSlice'

import styles from './style.module.css'
import { SuccessModal } from '../../components/SuccessModal/SuccessModal'

export const Workout: FC = () => {
  const { id, day } = useParams()
  const user = useAppSelector(selectUser)
  const { userCourse, isLoading } = useUserCourse(user?.uid, Number(id))
  const [isModalOneShown, setIsModalOneShown] = useState(false)
  const [isModalTwoShown, setIsModalTwoShown] = useState(false)

  if (isLoading) return <WarningPage text="Загрузка..." user={user} />

  if (!user) return <WarningPage text="Вы не авторизованы!" />

  if (!userCourse)
    return (
      <WarningPage text="Вы не зарегистрированы на этот курс!" user={user} />
    )

  const workout = userCourse.workouts![Number(day) - 1]

  const handleClick = () => {
    setIsModalOneShown(true)
  }

  const handleSendClick = () => {
    setIsModalOneShown(false)
    setIsModalTwoShown(true)
  }

  return (
    <div className={styles.container}>
      <Navigation children={<User user={user} />} />
      <main className={styles.main}>
        <h1 className={styles.heading}>{userCourse.name}</h1>
        <h2 className={styles.title}>{workout.name}</h2>

        <VideoPlayer url={workout?.videoUrl || ''} />

        {workout.exercises!.length > 0 && (
          <div className={styles.exercises}>
            <Exercises exercises={workout.exercises} onClick={handleClick} />
            <Progress exercises={workout.exercises} workoutId={workout.id} />
          </div>
        )}
      </main>
      {isModalOneShown && (
        <ProgressModal
          setIsOpened={setIsModalOneShown}
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
