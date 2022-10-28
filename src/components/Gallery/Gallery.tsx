import { Skeleton } from '@mui/material'
import { Link } from 'react-router-dom'

import { useGetCoursesQuery } from '../../api/courses.api'
import { NUMBER_OF_SKELETONS, SKELETON_COLOR } from '../../constants'
import { ROUTES } from '../../routes'
import { Card } from '../Card/Card'

import styles from './style.module.css'

export const Gallery = () => {
  const { data: courses, isLoading, error } = useGetCoursesQuery()

  return (
    <div className={styles.gallery}>
      {courses &&
        courses.map((item) => (
          <Link
            key={item.id}
            to={`${ROUTES.aboutCourse}/${Number(item.id) + 1}`}
            className={styles.link}
          >
            <Card item={item} />
          </Link>
        ))}
      {isLoading &&
        Array.from(new Array(NUMBER_OF_SKELETONS)).map((item, index) => (
          <Skeleton
            sx={{ bgcolor: SKELETON_COLOR, borderRadius: '30px' }}
            variant="rounded"
            width={360}
            height={480}
            key={index.toString()}
          />
        ))}
      {error && (
        <p className={styles.errorMessage}>
          Извините, произошла ошибка! {JSON.stringify(error)}
        </p>
      )}
    </div>
  )
}
