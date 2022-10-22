import { FC } from 'react'

import { CourseData } from '../../types'
import { CourseLine } from './CourseLine'
import { Header } from './Header'

import styles from './style.module.css'

type Props = { courses: CourseData[] }

export const CourseTable: FC<Props> = ({ courses }) => {
  return (
    <div className={styles.table}>
      <Header/>
      {courses && courses.map((item) => (
        <CourseLine key={item.name} item={item}/>
      ))}
    </div>
  )
}
