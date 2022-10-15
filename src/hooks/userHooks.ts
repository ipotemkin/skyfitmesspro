import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { get, ref } from 'firebase/database'
import { merge } from 'lodash'

import auth from "../db/auth"
import db from "../db/db"
import { useGetCourseQuery, useGetCoursesQuery } from '../api/courses.api'
import { useGetUserCourseQuery, useGetUserCoursesQuery } from '../api/users.api'
import { CourseData } from '../types'
import { useDispatch } from 'react-redux'
import { initialState, setUser } from '../slices/userSlice'

export const useAuth = () => {
  const noop = () => {}  // заглушка для колбэков
  const dispatch = useDispatch()

  // залогиниться
  const signIn = (
    username: string,
    password: string,
    successCallback = noop,
    errorCallback = noop
    ) => {
    dispatch(setUser({
      ...initialState, isLoading: true
    }))
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in: ', user)
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isLoading: true
        }))
        successCallback() // на всякий случай
      })
      .catch((error) => {
        console.error(
          `sign-in failed: error.code=${error.code}, error.message=${error.message}`
        )
        errorCallback() // на всякий случай
      })   
  }

  // разлогиниться
  const logOut = (successCallback = noop, errorCallback = noop) => {
    signOut(auth).then(() => {
      console.log('Sign-out successful!')
      successCallback() // на всякий случай
    }).catch((error) => {
      console.error('Sign-out failed!')
      errorCallback() // на всякий случай
    })
  }

  // зарегистировать нового пользователя
  const signUp = (
    username: string,
    password: string,
    successCallback = noop,
    errorCallback = noop
    ) => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('User created -->', user)
        successCallback() // на всякий случай
      })
      .catch((error) => {
        console.error(
          `Error creating a user: error.code=${error.code}, error.message=${error.message}`
        )
        errorCallback() // на всякий случай
      })
  }

  return { signIn, logOut, signUp }
}

const getValidKeys = (obj: object) => {
  const validKeys = []
  for (let [curKey, curValue] of Object.entries(obj)) {
    if (curValue) validKeys.push(curKey)
  }
  return validKeys
}

export const useUserCourses = (uid: string) => {
  const { data: courses } = useGetCoursesQuery()
  const { data: userCoursesData } = useGetUserCoursesQuery(uid)
  const [userCourses, setUserCourses] = useState<CourseData[]>()

  useEffect(() => {
    if (userCoursesData && courses) {
      const res = []
      const validKeys: string[] = getValidKeys(userCoursesData)
      for(let i in validKeys) res.push(courses[+validKeys[i]])      
      setUserCourses(res)
    }
  }, [userCoursesData, courses])

  return userCourses
}

export const useUserCourse = (uid: string | null, courseId: number) => {
  const { data: course } = useGetCourseQuery(courseId)
  const { data: userCourseData, error, isLoading: isUserCourseLoading } = useGetUserCourseQuery({
    uid: uid || '',
    courseId
  })
  const [userCourse, setUserCourse] = useState<CourseData>()
  const [isLoading, setIsLoading] = useState(true)

  console.log('course -->', course)

  console.group('useGetUserCourseQuery result -->')
  console.log('userCourseData -->', userCourseData)
  console.log('error -->', error)
  console.log('isUserCourseLoading -->', isUserCourseLoading)
  console.groupEnd()

  useEffect(() => {

    // если загрузка идет или нет uid
    if (isUserCourseLoading || !uid ) {
      setIsLoading(true)
      return
    }

    // если загрузка завершена но нет данных
    if (!isUserCourseLoading && !userCourseData) {
      setIsLoading(false)
      return    
    }
    
    // если есть все данные, то ставим загрузку в false
    if (userCourseData && course && uid) {
      const res = {}
      merge(res, course, userCourseData)
      setUserCourse(res)
      setIsLoading(false)
      return
    }
      
  }, [userCourseData, course, courseId, isUserCourseLoading, uid])
  
  return { userCourse, isLoading, error }
}

export const useUserWorkoutStatus = (uid: string, courseId: number, workoutId: number) => {
  const [status, setStatus] = useState()

  useEffect(() => {

  }, )
  
  const workoutRef = ref(db, `users/${uid}/courses/${courseId}/workouts/${workoutId}/done`)
  get(workoutRef).then((snapshot) => {
    if (snapshot.exists()) {
      setStatus(snapshot.val())
    } else {
      console.warn("No data available")
    }
  }).catch((error) => {
    console.error(error)
  })

  return status
}
