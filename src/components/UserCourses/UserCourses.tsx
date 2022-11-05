import React, { FC } from 'react'
import { usePrefetch } from '../../api/courses.api'

import { usePrefetchUserCourse, useUserCourses } from '../../hooks/userCourseHooks'
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
  const prefetchWorkouts = usePrefetchUserCourse('getUserCourse')
  const prefetchCourseData = usePrefetch('getCourse')

  const handleCourseClick = (e: React.MouseEvent, courseId: number) => {
    handleWorkouts(courseId)
  }

  const handlePrefetch = (uid: string, courseId: number) => {
    prefetchCourseData(courseId)
    prefetchWorkouts({ uid, courseId })
  }

  return (
    <div>
      <h4 className={styles.title}>Мои курсы</h4>{' '}
      {!userCourses && !isLoading && <Warning text="У вас пока нет курсов!" />}
      <div className={styles.galleryWrapper}>
        <div className={styles.gallery}>
          {userCourses &&
            userCourses.map((item) => (
              <div
                data-cy="gallery-course"
                className={styles.wrapper}
                key={item.id}
                onClick={(e) => handleCourseClick(e, item.id || 0)}
                onMouseEnter={() => handlePrefetch(user.localId!, item.id!)}
              >
                <Card item={item} key={item.id} />
                <div className={styles.go}>Перейти →</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
