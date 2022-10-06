import { db, getCourses, getCourseById, getUserWorkoutStatusAsync } from './api/firebase.api';
// import { api } from './api/firebase2.api';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from './api/firebase.api';
import { useGetUserCoursesQuery, useGetUserCourseQuery, useGetUserExercisesQuery, useUpdateUserExerciseProgressMutation, ExercisesPayload, ExerciseArg, ExerciseProgress } from './api/users.api';
import './App.css';
import { AuthDebug } from './components/AuthDebug/AuthDebug';
import { useAppDispatch } from './hooks/appHooks';
import { useUserCourse, useUserCourses, useUserWorkoutStatus } from './hooks/userHooks';
import { Main } from './pages/Main/Main';
import { getUserCourse } from './services/UserDataService';

function App() {
  getCourses(db)

  // getUserWorkoutStatusAsync('123', 0, 0)

  const status = useUserWorkoutStatus('123', 0, 0)
  console.log('status -->', status)

  getUserCourse('123', 0)

  // getCourseById(db, 3)

  // api.getCourses()

  // const { data } = useGetUserCoursesQuery('123')
  // console.log('UserCoursesQuery -->', data)

  // const { data: userCourseQuery } = useGetUserCourseQuery({uid: '123', courseId: 0})
  // console.log('UserCourseQuery -->', userCourseQuery)

  // const { data: userCourseExercises } = useGetUserExercisesQuery({uid: '123', courseId: 0, workoutId: 0})
  // console.log('UserCourseExercises -->', userCourseExercises)

  // const userCourses = useUserCourses('123')
  // console.log('UserCourses -->', userCourses)

  // const userCourse = useUserCourse('123', 0)
  // console.log('UserCourse -->', userCourse)

  // const [updateExerciseProgress] = useUpdateUserExerciseProgressMutation()

  // const arg: ExerciseArg = {uid: '123', courseId: 0, workoutId: 0, exerciseId: 0}
  // const body: ExerciseProgress = { userProgress: 9 }

  // useEffect(() => {
  //   const res = updateExerciseProgress({ arg, body }).unwrap()
  //   console.log('updateExerciseProgress -->', res)
  // }, [])
  
  // const username = 'ipotemkin@rambler.ru'
  // const password = 'Qwerty12345'
  
  // const handleSignIn = () => {
  //   signInWithEmailAndPassword(auth, username, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     console.log('User signed in: ', user)
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log('error when signed in: error -->', errorMessage)
  //   });  
  // }
  
  // const handleLogout = () => {
  //   signOut(auth).then(() => {
  //     // Sign-out successful.
  //     console.log('Sign-out successful!')
  //   }).catch((error) => {
  //     console.log('Sign-out failed!')
  //     // An error happened.
  //   });    
  // }

  return <>
    {/* <AuthDebug/> */}

    {/* <button onClick={handleSignIn}>Log in</button>
    <button onClick={handleLogout}>Log out</button>     */}

    <Main/>
  </>
}

export default App
