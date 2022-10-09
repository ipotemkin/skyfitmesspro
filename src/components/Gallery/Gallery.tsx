// TODO: нужны стили для сообщений о загрузке и ошибке
import { DataSnapshot, off, onValue } from 'firebase/database'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Card } from '../Card/Card'
import { CourseMainData } from '../../types'
import { coursesRef } from '../../db/refs'
import { getCourseList } from '../../db/service'
import { useGetCoursesQuery } from '../../api/courses.api'

import styles from './style.module.css'

export const Gallery = () => {
  // для работы через firebase
  const [courses, setCourses ] = useState<CourseMainData[]>()
  // для работы через RTK Query
  // const { data: courses } = useGetCoursesQuery()
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  
  // для работы через firebase
  // что делаем с данными, полученными из БД
  const onDataChange = (items: DataSnapshot) => {
    if (items.exists()) {
      setCourses(getCourseList(items))
    } else {
      setError('Упс... Ошибка загрузки')
      console.error('Data not found')
    }
    setIsLoading(false)
  }
  
  // для работы через firebase
  useEffect(() => {
    // подписка на данные из БД
    onValue(coursesRef, onDataChange)
    
    return () => {
      // отключаем подписку на данные из БД
      // если отключить подписку, то при возврате на эту страницу данные будут снова
      // загружаться из базы данных
      // ?? можно ли работать, не отклюая здесь подписку, чтобы брать данные из кэша?
      // off(coursesRef, 'value', onDataChange)
    }
  }, [])

  return (
    <div className={styles.gallery}>
      {courses && courses.map((item) => (
        <Link key={item.id} to={`/aboutcourse/${item.id}`} className={styles.link}>
          <Card item={item}></Card>
        </Link>
      ))}
      {isLoading && <h1 style={{ color: 'white' }}>Загрузка...</h1>}
      {error && <h1 style={{ color: 'white' }}>{error}</h1>}
    </div>
  )
}
