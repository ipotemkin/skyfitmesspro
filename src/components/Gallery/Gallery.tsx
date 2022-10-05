import { cn } from '@bem-react/classname'
import { Card } from '../Card/Card'
import { useGetCoursesQuery } from '../../api/courses.api'

import './Gallery.css'
import { useUserCourses } from '../../hooks/userHooks'

const cnGallery = cn('Gallery')

export const Gallery = () => {
  const { data } = useGetCoursesQuery()
  
  // получить все курсы пользователя с uid '123'
  // const data = useUserCourses('123')

  return (
    <div className={cnGallery()}>
      {data && data.map((item) => (
        <Card item={item} key={item.id}></Card>
      ))}
    </div>
  )
}
