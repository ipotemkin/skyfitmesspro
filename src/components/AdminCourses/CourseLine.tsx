import { Button } from '@mui/material'
import { FC } from 'react'

import {
  useAddUserCourseMutation,
  useDelUserCourseMutation,
} from '../../api/users.api'
import { useAppSelector } from '../../hooks/appHooks'
import { selectCurrentUser } from '../../slices/currentUserSlice'
import { CourseData } from '../../types'

import styles from './style.module.css'

type Props = { item: CourseData }

export const CourseLine: FC<Props> = ({ item }) => {
  const user = useAppSelector(selectCurrentUser)
  const [addCourse] = useAddUserCourseMutation()
  const [delCourse] = useDelUserCourseMutation()

  const handleAddCourse = async () => {
    if (user && user.localId && item.id !== undefined) {
      await addCourse({
        uid: user.localId!,
        courseId: item.id!,
      })
    }
  }

  const handleRemoveCourse = async () => {
    if (user && user.localId && item.id !== undefined) {
      await delCourse({
        uid: user.localId!,
        courseId: item.id!,
      })
    }
  }

  return (
    <div
      className={styles.line}
      style={{ backgroundColor: item.id! % 2 === 0 ? 'whitesmoke' : '' }}
    >
      <div className={styles.col1}>{item.id! + 1}</div>
      <div className={styles.col2}>{item.name}</div>
      <div className={styles.col3}>
        {item.subscription && (
          <Button style={{ color: 'red' }} onClick={handleRemoveCourse}>
            Удалить
          </Button>
        )}
        {!item.subscription && (
          <Button onClick={handleAddCourse}>Добавить</Button>
        )}
      </div>
    </div>
  )
}
