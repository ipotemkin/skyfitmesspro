import { DataSnapshot, get } from "firebase/database"
import { CourseData, CourseMainData } from "../types"
import { coursesRef } from "./refs"

// получить список курсов из снапшота
export const getCourseList = (data: DataSnapshot) => {
  const coursesMainData: CourseMainData[] = []
  data.forEach(item => {
    coursesMainData.push({
      id: item.child('id').val(),
      name: item.child('name').val(),
      coverUrl: item.child('coverUrl').val()
    })
  })
  return coursesMainData
}

export const getUserCourseList = async (userCoursesSnapshot: DataSnapshot) => {
  const coursesSnapshot = get(coursesRef)
  try {
    return (await coursesSnapshot).val() as CourseData[]
  } catch(err) {
    console.error(err)
  }
}
