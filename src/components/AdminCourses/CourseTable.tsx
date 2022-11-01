import { FC } from 'react'

import { useCoursesWithSubscription } from '../../hooks/userCourseHooks'
import { CourseLine } from './CourseLine'
import { Header } from './Header'

import styles from './style.module.css'

type Props = { uid: string }

export const CourseTable: FC<Props> = ({ uid }) => {
  const { data: courses } = useCoursesWithSubscription(uid)

  return (
    <div className={styles.table}>
      <Header />
      {courses &&
        courses.map((item) => <CourseLine key={item.name} item={item} />)}
    </div>
  )
}
