// import { db, getCourses, getCourseById } from './api/firebase.api';
// import { api } from './api/firebase2.api';
import { useEffect } from 'react';
import { useGetUserCoursesQuery, useGetUserCourseQuery, useGetUserExercisesQuery, useUpdateUserExerciseProgressMutation, ExercisesPayload, ExerciseArg, ExerciseProgress } from './api/users.api';
import './App.css';
import { useAppDispatch } from './hooks/appHooks';
import { useUserCourse, useUserCourses } from './hooks/userHooks';
import { Main } from './pages/Main/Main';

function App() {
  // getCourses(db)
  // getCourseById(db, 3)

  // api.getCourses()

  const { data } = useGetUserCoursesQuery('123')
  console.log('UserCoursesQuery -->', data)

  const { data: userCourseQuery } = useGetUserCourseQuery({uid: '123', courseId: 0})
  console.log('UserCourseQuery -->', userCourseQuery)

  const { data: userCourseExercises } = useGetUserExercisesQuery({uid: '123', courseId: 0, workoutId: 0})
  console.log('UserCourseExercises -->', userCourseExercises)

  const userCourses = useUserCourses('123')
  console.log('UserCourses -->', userCourses)

  const userCourse = useUserCourse('123', 0)
  console.log('UserCourse -->', userCourse)

  const [updateExerciseProgress] = useUpdateUserExerciseProgressMutation()

  const arg: ExerciseArg = {uid: '123', courseId: 0, workoutId: 0, exerciseId: 0}
  const body: ExerciseProgress = { userProgress: 9 }
  // const payload: ExercisesPayload = {
  //   arg,
  //   body
  // }

  useEffect(() => {
    const res = updateExerciseProgress({ arg, body }).unwrap()
    console.log('updateExerciseProgress -->', res)
  }, [])
  
  return <Main></Main>
}

export default App
