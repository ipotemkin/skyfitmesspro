// HERE WILL BE USER HOOKS

import { useEffect, useState } from "react";
import { useGetCourseQuery, useGetCoursesQuery } from "../api/courses.api";
import { useGetUserCourseQuery, useGetUserCoursesQuery } from "../api/users.api"
import { CourseData, Exercise, Workout } from "../types";
import { merge } from 'lodash';


export const useAuth = () => {
  // 
}

const getValidKeys = (obj: object) => {
  const validKeys = [];
  for (let [curKey, curValue] of Object.entries(obj)) {
    if (curValue) validKeys.push(curKey);
  }
  return validKeys;
}

export const useUserCourses = (uid: string) => {
  const { data: courses } = useGetCoursesQuery();
  const { data: userCoursesData } = useGetUserCoursesQuery(uid);
  const [userCourses, setUserCourses] = useState<CourseData[]>();

  useEffect(() => {
    if (userCoursesData && courses) {
      const res = []
      const validKeys: string[] = getValidKeys(userCoursesData);
      for(let i in validKeys) res.push(courses[+validKeys[i]]);      
      setUserCourses(res);
    }
  }, [userCoursesData, courses]);

  return userCourses;
}

export const useUserCourse = (uid: string, courseId: number) => {
  const { data: course } = useGetCourseQuery(courseId);
  const { data: userCourseData } = useGetUserCourseQuery({ uid, courseId });
  const [userCourse, setUserCourse] = useState<CourseData>();

  console.log('course -->', course);

  useEffect(() => {
    if (userCourseData && course) {
      const res = {};
      merge(res, course, userCourseData);
      setUserCourse(res);
    }
  }, [userCourseData, course, courseId]);

  return userCourse;
}
