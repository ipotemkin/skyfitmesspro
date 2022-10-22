import { useCoursesWithSubscription, useUserCourses } from '../../hooks/userHooks'
import { FC } from 'react'
import { CourseTable } from '../AdminCourses/CourseTable'

type Props = {
  uid: string
}

export const UserGallery: FC<Props> = ({ uid }) => {
  // const { data } = useGetCoursesQuery()
  
  // получить все курсы пользователя с uid '123'
  const { data } = useUserCourses(uid)
  const { data: courses } = useCoursesWithSubscription(uid)
  console.log('UserGallery: userCourses -->', data)

  return (
    <div>
      {/* <div className={cnGallery()}>
        {data && data.map((item) => (
          <Card item={item} key={item.id}></Card>
        ))}
      </div> */}
      <div>
        <CourseTable courses={courses}/>
        {/* <Header/>
        {courses && courses.map((item) => (
            <CourseLine key={item.name} item={item}/>
          ))} */}
      </div>
    </div>
    )
}
