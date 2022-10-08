import { cn } from '@bem-react/classname'
import { Card } from '../Card/Card'

import './Gallery.css'
import { useUserCourses } from '../../hooks/userHooks'
import { FC } from 'react'

const cnGallery = cn('Gallery')

type Props = {
  uid: string
}

export const UserGallery: FC<Props> = ({ uid }) => {
  // const { data } = useGetCoursesQuery()
  
  // получить все курсы пользователя с uid '123'
  console.log('UserGallary')
  const data = useUserCourses(uid)

  return (
    <div className={cnGallery()}>
      {data && data.map((item) => (
        <Card item={item} key={item.id}></Card>
      ))}
    </div>
  )
}
