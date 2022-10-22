import { Button } from '@mui/material'
import { FC } from 'react'
import { useAddUserCourseMutation, useDelUserCourseMutation } from '../../api/users.api'
import { useAppSelector } from '../../hooks/appHooks'
import { selectUser } from '../../slices/userSlice'

import { CourseData } from '../../types'

import styles from './style.module.css'

type Props = { item: CourseData }

export const CourseLine: FC<Props> = ({ item }) => {
  const user = useAppSelector(selectUser)
  const [addCourse] = useAddUserCourseMutation()
  const [delCourse] = useDelUserCourseMutation()

  const handleAddCourse = () => {
    if (user && user.uid && item.id) {
      addCourse({
        uid: user.uid,
        courseId: item.id
      })
      console.log('adding course:', item.id)
    } else {
      console.log('error adding course:', item.id)
    }
  }

  const handleRemoveCourse = () => {
    if (user && user.uid && item.id) {
      delCourse({
        uid: user.uid,
        courseId: item.id
      })
      console.log('deleting the course with id:', item.id)
    } else {
      console.log('error deleting the course with id:', item.id)
    }
  }
  
  return (
    <div className={styles.line} style={{ backgroundColor: (item.id! % 2 === 0 ? 'whitesmoke' : '')}}
    >
      <div className={styles.col1}>{item.id}</div>
      <div className={styles.col2}>{item.name}</div>
      <div className={styles.col3}>
        {item.subscription && <Button style={{ color: 'red' }} onClick={handleRemoveCourse}>Удалить</Button>}
        {!item.subscription && <Button onClick={handleAddCourse}>Добавить</Button>}
      </div>
    </div>
  )
}
