import { merge } from 'lodash'

import { CourseData } from '../types'

// возвращает список ключей, не равных null
// это необходимо для очистки сырой информации из БД
export const getValidKeys = (obj: object) => {
  const validKeys = []
  for (let [curKey, curValue] of Object.entries(obj)) {
    if (curValue) validKeys.push(curKey)
  }
  return validKeys
}  

export const addSubscription = (source: CourseData[] | Object, courses: CourseData[]) => {
  const res: CourseData[] = []

  // если userCoursesData – это список
  if (Array.isArray(source)) {
    const coursesTemp: CourseData[] = []
    source.forEach((course: CourseData) => {
      coursesTemp.push({
        ...course,
        subscription: course ? true : false,
      })
    })
    merge(res, courses, coursesTemp)
  // если userCoursesData – это объект
  } else {
    const validKeys = getValidKeys(source)
    courses.forEach((course: CourseData) => {
      res.push({
        ...course,
        subscription: validKeys.includes(String(course.id))
          ? true
          : false,
      })
    })
  }
  return res
}
  
export const mergeCourseData = (course1: CourseData, course2: CourseData) => {
  const res = {}
  merge(res, course1, course2)
  return res
}
