// TODO: нужны стили для сообщений о загрузке и ошибке
import { Link } from 'react-router-dom'

import { Card } from '../Card/Card'
import { useGetCoursesQuery } from '../../api/courses.api'

import styles from './style.module.css'

export const Gallery = () => {
  const { data: courses, isLoading, error } = useGetCoursesQuery()
  
  return (
    <div className={styles.gallery}>
      {courses && courses.map((item) => (
        <Link key={item.id} to={`/aboutcourse/${item.id}`} className={styles.link}>
          <Card item={item}/>
        </Link>
      ))}
      {isLoading && <h1 style={{ color: 'white' }}>Загрузка...</h1>}
      {error && <h1 style={{ color: 'white' }}>{JSON.stringify(error)}</h1>}
    </div>
  )
}
