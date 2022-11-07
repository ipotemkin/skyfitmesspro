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
import { WorkoutModal } from '../../components/WorkoutModal/WorkoutModal'
import { useAppSelector } from '../../hooks/appHooks'
import { useUserCourse } from '../../hooks/userCourseHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { WarningPage } from '../WarningPage/WarningPage'

import styles from './style.module.css'

const Workout: FC = () => {
  const { id, day } = useParams()
  const courseId = Number(id) - 1
  const workoutIdx = Number(day) - 1

  const user = useAppSelector(selectCurrentUser)
  const [isModalOneShown, setIsModalOneShown] = useState(false)
  const [isModalTwoShown, setIsModalTwoShown] = useState(false)
  const [isWorkoutsShown, setIsWorkoutsShown] = useState(false)
  const { data, isLoading, isError } = useUserCourse(courseId)

  if (isLoading || (!data && !isError)) {
    return <WarningPage text="Загрузка..." user={user} />
  }

  if (!user.localId) {
    return <WarningPage text="Вы не авторизованы!" />
  }

  if (!data) {
    return (
      <WarningPage text="Вы не зарегистрированы на этот курс!" user={user} />
    )
  }

  if (!data.workouts || workoutIdx < 0 || workoutIdx >= data.workouts?.length)
    return (
      <WarningPage text="Нет такой тренировки на этом курсе!" user={user} />
    )

  const workout = data.workouts[workoutIdx]
  const workoutArg: WorkoutArg = {
    uid: user.localId,
    courseId,
    workoutId: workoutIdx,
  }

  const handleClick = () => setIsModalOneShown(true)

  const handleWorkoutClick = () => setIsWorkoutsShown(true)

  const handleSendClick = () => {
    setIsModalOneShown(false)
    setIsModalTwoShown(true)
  }

  return (
    <div className={styles.container}>
      <Navigation children={<User user={user} />} />
      <main className={styles.main}>
        <h1 className={styles.heading} onClick={handleWorkoutClick}>
          {data.name}
        </h1>
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
      {isWorkoutsShown && (
        <WorkoutModal
          setIsOpened={setIsWorkoutsShown}
          courseId={Number(id) - 1}
        />
      )}
    </div>
  )
}

export default Workout
