import classNames from 'classnames'
import { FC } from 'react'
import { Button } from '../../components/Button/Button'
import { Logo } from '../../components/Logo/Logo'
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

  const percent = 45

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
          <div className={styles.exercisesContent}>
            <h2 className={styles.exercisesTitle}>Упражнения</h2>
            <ul className={styles.exercisesList}>
              {exercises.map((exercise) => (
                <li className={styles.exercisesListItem}>
                  <span>{exercise.name} </span>
                  <span>({exercise.retriesCount}&nbsp;повторений)</span>
                </li>
              ))}
            </ul>
            <Button>Заполнить свой прогресс</Button>
          </div>

          <div className={styles.progress}>
            <h2 className={styles.progressTitle}>
              Мой прогресс по тренировке {workout.id}:
            </h2>
            <ul className={styles.progressList}>
              {exercises.map((exercise) => (
                <li className={styles.progressListItem}>
                  <span className={styles.exerciseName}>{exercise.name}</span>
                  <div
                    className={classNames(
                      styles.progressbar,
                      styles[`colorBg${exercise.id}`]
                    )}
                  >
                    <div
                      className={classNames(
                        styles.progressbarDone,
                        styles[`color${exercise.id}`]
                      )}
                      style={{ width: `${percent}%` }}
                    ></div>
                    <div
                      className={styles.progressbarPercent}
                      style={{ left: `calc(${percent}% - 62px)` }}
                    >
                      {percent}%
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
