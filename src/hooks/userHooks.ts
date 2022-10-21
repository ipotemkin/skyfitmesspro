import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword
} from 'firebase/auth'
import { get, ref } from 'firebase/database'
import { merge } from 'lodash'

import auth from "../db/auth"
import db from "../db/db"
import { useGetCourseQuery, useGetCoursesQuery } from '../api/courses.api'
import { useGetUserCourseQuery, useGetUserCoursesQuery } from '../api/users.api'
import { CourseData } from '../types'
import { useDispatch } from 'react-redux'
import { initialState, setUser } from '../slices/userSlice'
import { addEmitHelper } from 'typescript'

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
    dispatch(setUser({ ...initialState }))
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed in: ', user)
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          isLoading: false
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

export const useManageUser = () => {
  const noop = () => {}  // заглушка для колбэков

  const updateEmail = (
    newEmail: string,
    successCallback = noop,
    errorCallback = noop
  ) => {
    if (auth.currentUser) {
      firebaseUpdateEmail(auth.currentUser, newEmail).then(() => {
        console.log('Email updated')
        successCallback()
      }).catch((error) => {
        console.error(
          `update email failed: error.code=${error.code}, error.message=${error.message}`
        )
        errorCallback()
      })
    }
  }

  const updatePassword = (
    newPassword: string,
    successCallback = noop,
    errorCallback = noop
  ) => {
    if (auth.currentUser) {
      firebaseUpdatePassword(auth.currentUser, newPassword).then(() => {
        console.log('Password updated')
        successCallback()
      }).catch((error) => {
        console.error(
          `update password failed: error.code=${error.code}, error.message=${error.message}`
        )
        errorCallback()
      })
  
    }
  }
  
  return { updateEmail, updatePassword }
}

const getValidKeys = (obj: object) => {
  const validKeys = []
  for (let [curKey, curValue] of Object.entries(obj)) {
    if (curValue) validKeys.push(curKey)
  }
  return validKeys
}

export const useUserCourses = (uid: string) => {
  const { data: courses, isLoading: isCoursesLoading } = useGetCoursesQuery()
  const { data: userCoursesData, isLoading: isUserCoursesLoading } = useGetUserCoursesQuery(uid)
  const [userCourses, setUserCourses] = useState<CourseData[]>()
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    if (userCoursesData && courses) {
      const res = []
      const validKeys: string[] = getValidKeys(userCoursesData)
      for(let i in validKeys) res.push(courses[+validKeys[i]])      
      setUserCourses(res)
    }
  }, [userCoursesData, courses])

  useEffect(() => {
    if (!isCoursesLoading && !isUserCoursesLoading) {
      setIsloading(false)
    }
  }, [isCoursesLoading, isUserCoursesLoading])

  return { data: userCourses, isLoading }
}

export const useUserCourse = (uid: string | null, courseId: number) => {
  const { data: course } = useGetCourseQuery(courseId)
  const { 
    data: userCourseData, error, isLoading: isUserCourseLoading, isError: isErrorQuery
  } = useGetUserCourseQuery({
    uid: uid || '',
    courseId
  })
  const [userCourse, setUserCourse] = useState<CourseData>()
  const [isError, setIsError] = useState(false)

  // for DEBUG!
  console.log('course -->', course)
  console.group('useGetUserCourseQuery result -->')
  console.log('uid -->', uid)
  console.log('courseId -->', courseId)
  console.log('userCourseData -->', userCourseData)
  console.log('error -->', error)
  console.log('isUserCourseLoading -->', isUserCourseLoading)
  console.log('isError -->', isError)
  console.groupEnd()

  useEffect(() => {
    if (isErrorQuery) setIsError(true)
    else setIsError(false)
  }, [isErrorQuery])

  useEffect(() => {
    
    // если загрузка завершена но нет данных или пользователя
    if (!isUserCourseLoading && (!userCourseData || !uid)) setIsError(true)
    
    // если есть все данные, то ставим загрузку в false
    else if (userCourseData && course && uid) {
      const res = {}
      merge(res, course, userCourseData)
      setUserCourse(res)
    }
      
  }, [userCourseData, course, isUserCourseLoading, uid])
  
  return { data: userCourse, isLoading: isUserCourseLoading, error, isError }
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
