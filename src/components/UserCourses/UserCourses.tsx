import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'

import { Card } from '../Card/Card'
import { FirebaseUser } from '../../types'
import { useUserCourses } from '../../hooks/userHooks'

import styles from './style.module.css'
import { Warning } from '../Warning/Warning'

type Props = {
  user: FirebaseUser
  handleWorkouts?: VoidFunction
}

export const UserCourses: FC<Props> = ({
  user,
  handleWorkouts = (courseId: number) => {},
}) => {
  const userCourses = useUserCourses(user.uid || '')

  const handleCourseClick = (e: React.MouseEvent, courseId: number) => {
    handleWorkouts(courseId)
  }

  return (
    <div>
      <h4 className={styles.title}>Мои курсы</h4>{' '}
      {!userCourses && <Warning text="У вас пока нет курсов!" />}
      <div className={styles.gallery}>
        {userCourses &&
          userCourses.map((item) => (
            <div className={styles.wrapper} key={item.id}>
              {/* Исправить ссылку на страницу "Выберите тренировку" */}
              {/* <Link to={`/courses/${item.id}/workouts/1`} className={styles.link}> */}
              {/* <Link to={`/wlist`} className={styles.link}> */}
              <div onClick={(e) => handleCourseClick(e, item.id || 0)}>
                <Card item={item} key={item.id} />
              </div>
              {/* </Link> */}
              <div className={styles.go}>Перейти →</div>
            </div>
          ))}
      </div>
    </div>
  )
}
