import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { CourseData } from '../types'
import { parseFirebaseString } from './utils'

export const coursesApi = createApi({
  reducerPath: 'courses/api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (build) => ({
    getCourses: build.query<CourseData[], void>({
      query: () => 'courses.json',
    }),
    getCourse: build.query<CourseData, number>({
      query: (courseId: number) => `courses/${courseId}.json`,
      transformResponse: (response: CourseData) => {
        if (response.description) {
          response.description = parseFirebaseString(response.description)
        }
        return response
      },
    }),
  }),
})

export const {
  useGetCourseQuery,
  useGetCoursesQuery,
  usePrefetch,
} = coursesApi
