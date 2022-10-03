import { useEffect, useState } from 'react';
import { db, getCourses, getCourseById } from '../api/firebase.api';
import { CourseData, CourseMainData } from '../types'

export const useCourses = () => {
  const [courses, setCourses] = useState<CourseMainData[]>([]);

  const handleGetCourses = async () => {
    const res = await getCourses(db);
    setCourses(res);
  }
  
  useEffect(() => { handleGetCourses() }, []);

  return courses;
};

export const useCourse = (courseId: number) => {
  const [course, setCourse] = useState<CourseData>();

  const handleGetCourse = async () => {
    const res = await getCourseById(db, courseId);
    setCourse(res as CourseData);
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { handleGetCourse() }, []);

  return course;
};
