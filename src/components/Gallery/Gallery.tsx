// TODO: нужны стили для сообщений о загрузке и ошибке
import { DataSnapshot, off, onValue } from 'firebase/database'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Card } from '../Card/Card'
import { CourseMainData } from '../../types'
import { coursesRef } from '../../db/refs'
import { getCourseList } from '../../db/service'

import styles from './style.module.css'
import { useGetCoursesQuery } from '../../api/courses.api'
import { useAppSelector } from '../../hooks/appHooks'
import { selectCoursesListener } from '../../slices/listenerSlice'
import { useDispatch } from 'react-redux'
import { setCoursesListener } from '../../slices/listenerSlice'

export const Gallery = () => {
  const [flag, setFlag] = useState(false)
  
  const [courses, setCourses ] = useState<CourseMainData[]>()
  // const { data: courses } = useGetCoursesQuery()
  
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // const coursesListener = useAppSelector(selectCoursesListener)
  const dispatch = useDispatch()
  

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
  
  useEffect(() => {
    // подписка на данные из БД
    console.log('flag -->', flag)

    // console.log('coursesListener -->', coursesListener)
    // if(!flag) onValue(coursesRef, onDataChange)
    // setFlag(true)

    const listener = onValue(coursesRef, onDataChange)
    dispatch(setCoursesListener(listener))
    
    return () => {
      console.log('destroying Gallery')
      // отключаем подписку на данные из БД
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
