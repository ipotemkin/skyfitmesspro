import { cn } from '@bem-react/classname'
import { Card } from '../Card/Card'
import { useGetCoursesQuery } from '../../api/courses.api'

import './Gallery.css'

const cnGallery = cn('Gallery')

export const Gallery = () => {
  const { data } = useGetCoursesQuery()

  return (
    <div className={cnGallery()}>
      {data && data.map((item) => (
        <Card item={item} key={item.id}></Card>
      ))}
    </div>
  )
}
