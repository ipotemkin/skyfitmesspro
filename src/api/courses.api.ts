import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CourseData } from '../types';

export const coursesApi = createApi({
  reducerPath: 'courses/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skyfitnesspro-202210-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  endpoints: build => ({
    getCourses: build.query<CourseData[], void> ({
      query: () => 'courses.json',
    }),
    getCourse: build.query<CourseData, number> ({
      query: (courseId: number) => `courses/${courseId}.json`,
    }),
  }),
})

export const {
  useGetCourseQuery,
  useGetCoursesQuery
} = coursesApi
