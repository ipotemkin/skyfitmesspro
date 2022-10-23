import { useState } from 'react'

import auth from '../../db/auth'
import { useCoursesWithSubscription, useUserCourses } from '../../hooks/userHooks'
import { UserGallery } from '../PUserGallery/PUserGallery'

import { useAppSelector } from '../../hooks/appHooks'
import { useDispatch } from 'react-redux'

import styles from './style.module.css'
import { useSignInMutation } from '../../api/auth.api'
import { deleteCurrentUser, selectCurrentUser } from '../../slices/currentUserSlice'

type FormData = {
  username: string
  password: string
}

export const Admin = () => {
  const [restSignIn] = useSignInMutation()
  const currentUser = useAppSelector(selectCurrentUser)


  const [form, setForm] = useState<FormData>({ username: '', password: '' })
  
  const userCourses = useUserCourses(currentUser.localId || '')
  const dispatch = useDispatch()
  const { data: coursesWithSubscription } = useCoursesWithSubscription(currentUser.localId || '')

  const handleSignIn = async () => {
    // signIn(form.username, form.password)
    const res = await restSignIn({ email: form.username, password: form.password }).unwrap()
    console.log('handleSignIn -->', res)
  }

  const handleLogout = () => {
    dispatch(deleteCurrentUser())
  }

  const handleSignup = () => {
    // signUp(form.username, form.password)
  }

  const handleCurrentUser = () => {
    console.log('handleCurrentUser')
    console.log(auth.currentUser)
    console.log(typeof auth.currentUser)
  }

  const handleCurrentUserCourses = () => {
    const user = auth.currentUser
    if (user) {
      console.group('handleCurrentUserCourses:')
      console.log('current user uid -->', user.uid)
      console.log('user courses -->', userCourses)
      console.log('courses with subscription -->', coursesWithSubscription)
    }
  }

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value
    setForm((prev) => ({ ...prev, username }))
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    setForm((prev) => ({ ...prev, password }))
  }

  return (
    <div className={styles.container}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: 200,
          margin: 20,
        }}
      >
        <h3>Администрирование</h3>
        {/* <input
          type="text"
          placeholder="username (email)"
          value={form?.username}
          onChange={handleChangeUsername}
        ></input>
        <input
          type="text"
          placeholder="password"
          value={form?.password}
          onChange={handleChangePassword}
        ></input>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={handleSignup}>Sign Up!</button>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
        <button onClick={handleCurrentUser}>Get current user</button>
        <button onClick={handleCurrentUserCourses}>
          Get current user courses
        </button> */}
      </div> 
      {currentUser.localId && <UserGallery uid={currentUser.localId} />}
    </div>
  )
}
