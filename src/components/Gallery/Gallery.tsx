// TODO: нужны стили для сообщений о загрузке и ошибке

import { cn } from '@bem-react/classname'
import { Card } from '../Card/Card'

import './Gallery.css'
import { useEffect, useState } from 'react'
import { DataSnapshot, off, onValue, ref } from 'firebase/database'
import db from '../../db/db'
import { CourseData } from '../../types'

const cnGallery = cn('Gallery')

const colRef = ref(db, '/courses')

export const Gallery = () => {
  const [courses, setCourses ] = useState<CourseData[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const onDataChange = (items: DataSnapshot) => {
    if (items.exists()) {
      setCourses(items.val())
    } else {
      setError('Упс... Ошибка загрузки')
      console.error('Data not found')
    }
    setIsLoading(false)
  }
  
  useEffect(() => {
    onValue(colRef, onDataChange)
    
    return () => {
      off(colRef, 'value', onDataChange)
    }
  }, [])

  return (
    <div className={cnGallery()}>
      {courses && Object.values(courses).map((item) => (
        <Card item={item} key={item.id}></Card>
      ))}
      {isLoading && <h1 style={{ color: 'white' }}>Загрузка...</h1>}
      {error && <h1 style={{ color: 'white' }}>{error}</h1>}
    </div>
  )
}
