import React, { FC } from 'react'

import { useUserCourses } from '../../hooks/userCourseHooks'
import { FirebaseUserRESTAPI } from '../../types'
import { Card } from '../Card/Card'
import { Warning } from '../Warning/Warning'

import styles from './style.module.css'

type Props = {
  user: FirebaseUserRESTAPI
  handleWorkouts?: Function
}

export const UserCourses: FC<Props> = ({
  user,
  handleWorkouts = (courseId: number) => {},
}) => {
  const { data: userCourses, isLoading } = useUserCourses(user.localId)

  const handleCourseClick = (e: React.MouseEvent, courseId: number) => {
    handleWorkouts(courseId)
  }

  return (
    <div>
      <h4 className={styles.title}>Мои курсы</h4>{' '}
      {!userCourses && !isLoading && <Warning text="У вас пока нет курсов!" />}
      <div className={styles.gallery}>
        {userCourses &&
          userCourses.map((item) => (
            <div className={styles.wrapper} key={item.id}>
              <div onClick={(e) => handleCourseClick(e, item.id || 0)}>
                <Card item={item} key={item.id} />
                <div className={styles.go}>Перейти →</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
