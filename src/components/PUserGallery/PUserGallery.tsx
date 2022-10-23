import { FC } from 'react'

import { useCoursesWithSubscription } from '../../hooks/userHooks'
import { CourseTable } from '../AdminCourses/CourseTable'

type Props = {
  uid: string
}

export const UserGallery: FC<Props> = ({ uid }) => {
  const { data: courses } = useCoursesWithSubscription(uid)

  return <CourseTable courses={courses}/>
}
